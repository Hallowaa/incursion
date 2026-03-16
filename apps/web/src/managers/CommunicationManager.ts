import type { Socket } from 'socket.io-client'
import type LocalStorageManager from './LocalStorageManager'
import type UserUpdateBus from '@/buses/UserUpdateBus'
import type { Result } from '@/datatypes/util/Result'
import { io } from 'socket.io-client'
import Character from '@/datatypes/business/entity/Character'
import Incursion from '@/datatypes/business/incursion/Incursion'
import User from '@/datatypes/business/User'
import RestErrorDataTransfer from '@/datatypes/transfer/RestErrorDataTransfer'
import RestError from '@/errors/RestError'
import NotificationManager from './NotificationManager'

export default class CommunicationManager {
  // only to be set after validation
  public readonly network_error_code = 999
  private readonly fetch_timeout = 3000
  public accessToken = ''
  private alive = false
  private socket: Socket | undefined

  // buses
  public userUpdateBus: UserUpdateBus | undefined

  /**
   * Creates a new CommunicationManager.
   * @param uri - The uri of the backend.
   */
  public constructor(
    private readonly uri: string,
    public readonly localStorageManager: LocalStorageManager
  ) {}

  public async login(
    username: string,
    password: string
  ): Promise<Result<string, RestError>> {
    const init = this.generateRequestInit(
      'POST',
      JSON.stringify({ username, password }),
      ''
    )

    const result = await this.generateResult<string>('/auth/login/', init)

    if (result.success) {
      this.accessToken = result.result
    }

    this.initSocket()

    return result
  }

  public async loginWithToken(token: string) {
    this.accessToken = token
    this.initSocket()
  }

  public initSocket() {
    this.socket = io('/', {
      auth: {
        token: this.accessToken
      }
    })

    this.socket.on('connect_error', async (err) => {
      if (err.message === 'Unauthorized') {
        NotificationManager.info('Refreshing token.')
        const init = this.generateRequestInit('POST')
        const res = await this.generateResult('/auth/refresh/', init)

        if (res.success) {
          const accessToken = res.result
          this.localStorageManager.saveToken(res.result as string)
          this.accessToken = accessToken as string
          ;(this.socket!.auth as { token: string }).token =
            accessToken as string

          this.socket!.connect()
        }
      }
    })
  }

  public async register(
    username: string,
    password: string
  ): Promise<Result<undefined, RestError>> {
    const init = this.generateRequestInit(
      'POST',
      JSON.stringify({ username, password }),
      ''
    )

    return this.generateResult<undefined>('/auth/register/', init)
  }

  public isAlive(): boolean {
    return this.alive
  }

  public async fetchUser(): Promise<Result<User, Error>> {
    const characterResult = await this.fetchCharacter()
    if (!characterResult.success) {
      NotificationManager.error('Error fetching user.')
      return characterResult
    }

    try {
      const userData = await this.socketEmit<User>('user:getUser')
      const result = new User(
        userData.username,
        userData.createdAt,
        characterResult.result
      )

      this.userUpdateBus?.updateUser(result)
      return {
        success: true,
        result
      }
    } catch (err) {
      return {
        success: false,
        error: err as Error
      }
    }
  }

  public async fetchCharacter(): Promise<Result<Character, Error>> {
    try {
      const characterData =
        await this.socketEmit<Character>('user:getCharacter')

      if (!characterData) {
        NotificationManager.error(
          'Could not fetch character. Character not found.'
        )
        return {
          success: false,
          error: new Error('No character found')
        }
      }

      return {
        success: true,
        result: Character.toDomain(characterData)
      }
    } catch (err) {
      return {
        success: false,
        error: err as Error
      }
    }
  }

  public async beginIncursion(): Promise<Result<Incursion, Error>> {
    try {
      const incursionData = await this.socketEmit<Incursion>('incursion:begin')

      if (!incursionData) {
        NotificationManager.error(
          'Could not being incursion. Incursion data missing.'
        )
        return {
          success: false,
          error: new Error('Could not begin incursion')
        }
      }

      return {
        success: true,
        result: Incursion.fromDb(incursionData)
      }
    } catch (err) {
      return {
        success: false,
        error: err as Error
      }
    }
  }

  public async generateResult<T>(
    endpoint: string,
    init: RequestInit,
    noJsonParse = false
  ): Promise<Result<T, RestError>> {
    // abort fetch after timeout
    const controller = new AbortController()
    init.signal = controller.signal
    setTimeout(() => controller.abort(), this.fetch_timeout)

    let status = this.network_error_code
    let body: string | undefined

    try {
      const response = await fetch(this.uri + endpoint, init)
      status = response.status
      body = await response.text()
    } catch (error: unknown) {
      const res: Result<T, RestError> = {
        success: false,
        error: new RestError('', 400)
      }

      if ((error as Error).name === 'AbortError') {
        res.error.message = RestError.premadeMessage('Request timed out.')
      } else if ((error as Error).name === 'TypeError') {
        this.alive = false // connection failed
        res.error.message = RestError.premadeMessage('Network Error')
      } else {
        res.error.message = RestError.premadeMessage(
          `${(error as Error).name}: ${(error as Error).message}`
        )
      }
      return res
    }

    try {
      if (body == null || body.trim() === '') {
        if (status >= 400) {
          return {
            success: false,
            error: new RestError(
              RestError.premadeMessage(
                'Server returned an error with no body.'
              ),
              status
            )
          }
        }

        this.alive = true
        return {
          success: true,
          result: undefined as unknown as T
        }
      }

      if (status >= 400) {
        const errorDT: RestErrorDataTransfer = new RestErrorDataTransfer(
          JSON.parse(body).message,
          []
        )

        const error = errorDT.toRestError()

        return {
          success: false,
          error
        }
      }

      let data: T

      if (noJsonParse) {
        data = body as unknown as T
      } else {
        data = JSON.parse(body)
      }

      this.alive = true
      return {
        success: true,
        result: data
      }
    } catch (e) {
      const err = new RestError(
        RestError.premadeMessage('Invalid response body from server.'),
        500
      )

      if (e instanceof SyntaxError || e instanceof TypeError) {
        err.addContext(`${e.name}: ${e.message}`)
      }

      return {
        success: false,
        error: err
      }
    }
  }

  private socketEmit<T>(event: string): Promise<T> {
    return new Promise((resolve, reject) => {
      if (!this.socket) {
        reject(new Error('Socket not connected'))
        return
      }

      this.socket.emit(event, null, (response: T) => {
        resolve(response)
      })
    })
  }

  /**
   * Generates a request init with the given parameters.
   * @param method - The request method.
   * @param body - The request body.
   * @param token - The token to use for authentication.
   * @returns The generated request init.
   */
  private generateRequestInit(
    method: string,
    body?: string,
    token?: string
  ): RequestInit {
    return {
      method,
      credentials: 'include',
      headers: {
        'access-token': token ?? this.accessToken,
        'Content-Type': body ? 'application/json' : ''
      },
      body
    }
  }
}

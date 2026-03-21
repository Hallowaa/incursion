import type { Result } from '@/datatypes/util/Result'
import type RestError from '@/errors/RestError'
import type CommunicationManager from '@/managers/CommunicationManager'
import { defineStore } from 'pinia'
import User from '@/datatypes/business/User'
import NotificationManager from '@/managers/NotificationManager'
import { useCharacterStore } from './CharacterStore'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: undefined as User | undefined
    }
  },

  actions: {
    async fetchUser(comm: CommunicationManager): Promise<Result<User, Error>> {
      const characterStore = useCharacterStore()
      const characterResult = await characterStore.fetchCharacter(comm)

      if (!characterResult.success) {
        NotificationManager.error('Error fetching character.')
        return characterResult
      }

      try {
        const userData = await comm.socketEmit<User>('user:getUser')
        const result = new User(
          userData.username,
          userData.createdAt,
          characterResult.result
        )

        this.user = result

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
    },
    async login(
      username: string,
      password: string,
      comm: CommunicationManager
    ): Promise<Result<string, RestError>> {
      const init = comm.generateRequestInit(
        'POST',
        JSON.stringify({ username, password }),
        ''
      )

      const result = await comm.generateResult<string>('/auth/login/', init)

      if (result.success) {
        comm.accessToken = result.result
      }

      comm.initSocket()

      return result
    },
    async register(
      username: string,
      password: string,
      comm: CommunicationManager
    ): Promise<Result<undefined, RestError>> {
      const init = comm.generateRequestInit(
        'POST',
        JSON.stringify({ username, password }),
        ''
      )

      return comm.generateResult<undefined>('/auth/register/', init)
    }
  }
})

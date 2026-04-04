import type { Socket } from 'socket.io'
import { verifyAccessToken } from '../../middleware/auth'
import Log from '../../util/Log'

export function socketAuth(socket: Socket, next: (err?: Error) => void) {
  const token = socket.handshake.auth.token

  if (!token || typeof token !== 'string') {
    return next(new Error('Unauthorized'))
  }

  try {
    const payload = verifyAccessToken(token)
    socket.data.userId = payload.userId
    next()
  } catch {
    Log.i('Unauthorised request')
    next(new Error('Unauthorized'))
  }
}

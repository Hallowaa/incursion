import { Socket } from 'socket.io'
import { verifyAccessToken } from '../../middleware/auth'

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
    console.log('unauth request')
    next(new Error('Unauthorized'))
  }
}

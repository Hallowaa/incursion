import { Server } from 'socket.io'
import { registerCharacterHandlers } from './handlers/character'
import { registerConnectionHandlers } from './handlers/connection'
import { registerIncursionHandlers } from './handlers/incursion'
import { registerUserHandlers } from './handlers/user'
import { socketAuth } from './middleware/auth'

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: '*' }
  })

  io.use(socketAuth)

  io.on('connection', (socket) => {
    registerConnectionHandlers(io, socket)
    registerCharacterHandlers(io, socket)
    registerUserHandlers(io, socket)
    registerIncursionHandlers(io, socket)
  })

  return io
}

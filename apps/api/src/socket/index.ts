import { Server } from 'socket.io'
import { socketAuth } from './middleware/auth'
import { registerConnectionHandlers } from './handlers/connection'
import { registerUserHandlers } from './handlers/user'
import { registerIncursionHandlers } from './handlers/incursion'
import { registerCharacterHandlers } from './handlers/character'

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: '*' },
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

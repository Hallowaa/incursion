import { Server } from 'socket.io'
import CharacterManager from '../managers/CharacterManager'
import IncursionManager from '../managers/IncursionManager'
import { registerCharacterHandlers } from './handlers/character'
import { registerConnectionHandlers } from './handlers/connection'
import { registerIncursionHandlers } from './handlers/incursion'
import { registerUserHandlers } from './handlers/user'
import { socketAuth } from './middleware/auth'

export function initSocket(server: any) {
  const io = new Server(server, {
    cors: { origin: '*' }
  })

  const incursionManager = new IncursionManager(io)
  const characterManager = new CharacterManager()

  io.use(socketAuth)

  io.on('connection', async (socket) => {
    const character = await characterManager.load(socket.data.userId)

    if (!character) {
      console.error(`Could not find character ${socket.data.userId}`)
      socket.disconnect()
      return
    }

    registerConnectionHandlers(io, socket)
    registerCharacterHandlers(io, socket)
    registerUserHandlers(io, socket)
    registerIncursionHandlers(io, socket, incursionManager)
  })

  return io
}

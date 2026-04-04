import type { Server, Socket } from 'socket.io'
import Log from '../../util/Log'

export function registerConnectionHandlers(io: Server, socket: Socket) {
  Log.i(`User connected: ${socket.data.userId}`)

  socket.on('disconnect', () => {
    Log.i(`User disconnected: ${socket.data.userId}`)
  })
}

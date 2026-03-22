import type { Server, Socket } from 'socket.io'

export function registerConnectionHandlers(io: Server, socket: Socket) {
  // eslint-disable-next-line no-console
  console.log('User connected:', socket.data.userId)

  socket.on('disconnect', () => {
    // eslint-disable-next-line no-console
    console.log('User disconnected:', socket.data.userId)
  })
}

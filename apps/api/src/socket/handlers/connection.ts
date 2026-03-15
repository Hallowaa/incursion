import { Socket, Server } from 'socket.io'

export function registerConnectionHandlers(io: Server, socket: Socket) {
  console.log('User connected:', socket.data.userId)

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.data.userId)
  })
}

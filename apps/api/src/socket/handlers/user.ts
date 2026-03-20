import { Socket, Server } from 'socket.io'
import { UserModel } from '../../models/schemas/UserSchema'

export function registerUserHandlers(io: Server, socket: Socket) {
  socket.on('user:getUser', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const user = await UserModel.findById(userId).lean()

    callback(user)
  })
}

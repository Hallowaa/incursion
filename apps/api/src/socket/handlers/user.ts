import { Socket, Server } from 'socket.io'
import type { ICharacterDto } from '@incursion/dto'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { UserModel } from '../../models/schemas/UserSchema'

export function registerUserHandlers(io: Server, socket: Socket) {
  socket.on('user:getCharacter', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const character = await CharacterModel.findOne({ owner: userId }).lean()

    if (!character) {
      callback(null)
      return
    }

    const dto: ICharacterDto = {
      _id: character._id.toString(),
      owner: character.owner.toString(),
      name: character.name,
      experience: character.experience,
      classes: character.classes,
      inventory: character.inventory,
      passivePointsSpent: character.passivePointsSpent,
      stats: character.stats.map((s) => ({
        statId: s.statId,
        baseValue: s.baseValue,
        buffs: s.buffs.map((b) => ({
          name: b.name,
          flatValue: b.flatValue,
          percentualValue: b.percentualValue,
          isAdditive: b.isAdditive,
        })),
      })),
      currentIncursion: character.currentIncursion?.toString(),
    }

    callback(dto)
  })

  socket.on('user:getUser', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const user = await UserModel.findById(userId).lean()

    callback(user)
  })
}

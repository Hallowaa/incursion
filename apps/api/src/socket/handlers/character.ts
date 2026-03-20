import { CharacterClassId, ICharacterDto } from "@incursion/dto";
import { Server, Socket } from "socket.io";
import { CharacterModel } from "../../models/schemas/entity/CharacterSchema";

export function registerCharacterHandlers(io: Server, socket: Socket) {
    socket.on('character:getCharacter', async (_data, callback) => {
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
      classes: character.classes as CharacterClassId[],
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

  socket.on('character.getClassAdvancements', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const character = await CharacterModel.findOne({ owner: userId }).lean()

    if (!character) {
      callback(null)
      return
    }

  })
}
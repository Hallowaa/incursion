import type { Server, Socket } from 'socket.io'
import CharacterClassMapper from '../../mappers/entity/CharacterClassMapper'
import CharacterMapper from '../../mappers/entity/CharacterMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'

export function registerCharacterHandlers(io: Server, socket: Socket) {
  socket.on('character:getCharacter', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const characterModel = await CharacterModel.findOne({ owner: userId }).lean()

    if (!characterModel) {
      callback(null)
      return
    }

    const character = CharacterMapper.toDomain(characterModel)
    callback(CharacterMapper.toDto(character))
  })

  socket.on('character:getClassAdvancements', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const userId = socket.data.userId
    const characterModel = await CharacterModel.findOne({ owner: userId }).lean()

    if (!characterModel) {
      callback(null)
      return
    }

    const character = CharacterMapper.toDomain(characterModel)
    const characterClass = character.classes.at(-1)!.advancements.map((ca) => CharacterClassMapper.toDto(CharacterClassMapper.toDomain(ca)))
    callback(characterClass)
  })
}

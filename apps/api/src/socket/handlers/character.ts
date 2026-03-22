import type { CharacterClassId } from '@incursion/dto'
import type { Server, Socket } from 'socket.io'
import CharacterClassMapper from '../../mappers/entity/CharacterClassMapper'
import CharacterMapper from '../../mappers/entity/CharacterMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { safeHandler } from './safeHandler'

export function registerCharacterHandlers(io: Server, socket: Socket) {
  socket.on('character:getCharacter', safeHandler(async (_data, callback) => {
    if (typeof callback !== 'function') return

    const characterModel = await getCharacter(socket)

    if (!characterModel) {
      callback(null)
      return
    }

    const character = CharacterMapper.toDomain(characterModel)
    callback(CharacterMapper.toDto(character))
  }))

  socket.on('character:getClassAdvancements', safeHandler(async (_data, callback) => {
    if (typeof callback !== 'function') return

    const characterModel = await getCharacter(socket)

    if (!characterModel) {
      callback(null)
      return
    }

    const character = CharacterMapper.toDomain(characterModel)
    const characterClass = character.classes.at(-1)!.advancements.map((ca) => CharacterClassMapper.toDto(CharacterClassMapper.toDomain(ca)))
    callback(characterClass)
  }))

  socket.on('character:chooseClass', safeHandler(async (_data, callback) => {
    if (typeof callback !== 'function') return

    const characterClassId = _data as CharacterClassId
    const characterModel = await getCharacter(socket)

    if (!characterModel) {
      callback(null)
      return
    }

    // TODO: check if character is eligible to advance
    // something like characterClass.validate(character)

    // update characterClass arr of character

    const character = CharacterMapper.toDomain(characterModel)
    const characterClass = CharacterClassMapper.toDomain(characterClassId)

    character.addCharacterClass(characterClass)
  }))
}

async function getCharacter(socket: Socket) {
  const userId = socket.data.userId
  const characterModel = await CharacterModel.findOne({ owner: userId }).lean()

  return characterModel
}

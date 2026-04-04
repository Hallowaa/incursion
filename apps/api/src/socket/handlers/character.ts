import type { CharacterClassId } from '@incursion/dto'
import type { Server, Socket } from 'socket.io'
import type CharacterManager from '../../managers/CharacterManager'
import type IncursionManager from '../../managers/IncursionManager'
import CharacterClassMapper from '../../mappers/entity/CharacterClassMapper'
import CharacterMapper from '../../mappers/entity/CharacterMapper'
import EntityStatMapper from '../../mappers/entity/EntityStatMapper'
import IncursionMapper from '../../mappers/incursion/IncursionMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { IncursionInstanceModel } from '../../models/schemas/incursion/IncursionInstanceSchema'
import Log from '../../util/Log'
import { safeHandler } from './safeHandler'

export function registerCharacterHandlers(io: Server, socket: Socket, incursionManager: IncursionManager, characterManager: CharacterManager) {
  socket.on('character:getCharacter', async (_data, callback) => {
    if (typeof callback !== 'function') return

    const character = getCharacter(characterManager, socket)

    if (!character) {
      Log.e(`Could not find character for class advancements`)
      callback(null)
      return
    }

    const dto = CharacterMapper.toDto(character)

    if (character.currentIncursionId) {
      const incursionDoc = await IncursionInstanceModel.findOne({
        _id: character.currentIncursionId
      })

      if (!incursionDoc) {
        Log.e(`Failed to find incursion on db for character ${character._id.toString()}`)
      } else {
        const incursion = IncursionMapper.toDomain(incursionDoc)
        incursionManager.addIncursion(character._id, incursion._id, incursion)
        const incursionDto = IncursionMapper.toDto(incursion)
        dto.currentIncursion = incursionDto
      }
    }

    callback(dto)
  })

  socket.on('character:getClassAdvancements', safeHandler(async (_data, callback) => {
    if (typeof callback !== 'function') return

    const character = getCharacter(characterManager, socket)

    if (!character) {
      Log.e(`Could not find character for class advancements`)
      callback(null)
      return
    }

    const characterClass = character.classes.at(-1)!.advancements.map((ca) => CharacterClassMapper.toDto(CharacterClassMapper.toDomain(ca)))
    callback(characterClass)
  }))

  socket.on('character:chooseClass', safeHandler(async (_data, callback) => {
    if (typeof callback !== 'function') return

    const characterClassId = _data as CharacterClassId
    const character = getCharacter(characterManager, socket)

    if (!character) {
      Log.e(`Could not find character for class advancements`)
      callback(null)
      return
    }

    // TODO: check if character is eligible to advance
    // something like characterClass.validate(character)

    const characterClass = CharacterClassMapper.toDomain(characterClassId)
    character.addCharacterClass(characterClass)

    await CharacterModel.updateOne(
      { _id: character._id },
      { $push: { classes: characterClassId } }
    )

    const statsDto = character.stats.map((s) => EntityStatMapper.toDto(s))
    socket.emit('character:classUpdated', characterClass)
    socket.emit('character:statsUpdated', statsDto)
    callback(true)
  }))
}

function getCharacter(manager: CharacterManager, socket: Socket) {
  const userId = socket.data.userId

  if (!userId) {
    Log.e('usedId is undefined on socket when trying to get character')
    return
  }

  const characterModel = manager.get(userId)

  return characterModel
}

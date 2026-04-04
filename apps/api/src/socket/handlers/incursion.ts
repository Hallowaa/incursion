import type { IActionAbilityContextDto } from '@incursion/dto'
import type { Server, Socket } from 'socket.io'
import type CharacterManager from '../../managers/CharacterManager'
import type IncursionManager from '../../managers/IncursionManager'
import IncursionGenerator from '../../generators/IncursionGenerator'
import IncursionMapper from '../../mappers/incursion/IncursionMapper'
import IncursionTemplateMapper from '../../mappers/incursion/IncursionTemplateMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { IncursionInstanceModel } from '../../models/schemas/incursion/IncursionInstanceSchema'
import { IncursionTemplateModel } from '../../models/schemas/incursion/IncursionTemplateSchema'
import Log from '../../util/Log'
import { safeHandler } from './safeHandler'

export function registerIncursionHandlers(io: Server, socket: Socket, incursionManager: IncursionManager, characterManager: CharacterManager) {
  socket.on('incursion:begin', safeHandler(async (_data, callback) => {
    const character = getCharacter(characterManager, socket)

    if (!character) {
      Log.e(`Could not find character ${socket.data.userId} for incursion begin`)
      callback(null)
      return
    }

    // temporarily just take the first template
    const templateDoc = await IncursionTemplateModel.findOne().lean()

    if (!templateDoc) {
      Log.e('Failed to find suitable template when beginning incursion')
      callback(null)
      return
    }

    const template = IncursionTemplateMapper.toDomain(templateDoc)
    const result = IncursionGenerator.generateIncursion(template, character)
    const toDb = IncursionMapper.toDb(result)
    const toDto = IncursionMapper.toDto(result)

    try {
      const saved = await IncursionInstanceModel.create({
        _id: toDb._id,
        name: toDb.name,
        level: toDb.level,
        rooms: toDb.rooms,
        currentRoom: toDb.currentRoom,
        theme: toDb.theme
      })

      await CharacterModel.updateOne(
        { _id: character._id },
        { $set: {
          currentIncursionId: saved._id
        } }
      )

      character.currentIncursionId = result._id
      incursionManager.addIncursion(character._id, saved._id, result)
      socket.join(saved._id.toString())

      callback(toDto)
    } catch (err) {
      Log.e(`Failed to save incursion: ${err}`)
      callback(null)
    }
  }))

  socket.on('incursion:startTicking', safeHandler(async (_data, callback) => {
    const character = getCharacter(characterManager, socket)

    if (!character) {
      Log.e(`Could not find character ${socket.data.userId} for incursion start ticking`)
      callback(null)
      return
    }

    const incursionId = character.currentIncursionId

    if (!incursionId) {
      Log.e(`Failed to start ticking incursion for character ${character._id.toString()}. Character has no current incursion`)
      callback(null)
      return
    }

    Log.i(`Received start ticking request from ${character.name} for incursion ${incursionId.toString()}`)

    let existingIncursion = incursionManager.getIncursion(incursionId)

    if (!existingIncursion) {
      // just add it to the manager
      const currentIncursionId = character.currentIncursionId

      if (!currentIncursionId) {
        Log.e(`Current incursion does not exist for character ${character._id.toString()} on server, but it may exist on db. Proceeding to instantiate it.`)
        callback(null)
        return
      }

      const doc = await IncursionInstanceModel.findOne(
        { _id: incursionId }
      )

      if (!doc) {
        Log.e(`Failed to instantiate incursion. Could not find it on db.`)
        callback(null)
        return
      }

      const incursion = IncursionMapper.toDomain(doc)

      incursionManager.addIncursion(character._id, incursionId, incursion)
      existingIncursion = incursionManager.getIncursion(incursionId)
    }

    existingIncursion!.active = true

    socket.join(incursionId.toString())
  }))

  socket.on('incursion:actionPerformed', safeHandler(async (_data: IActionAbilityContextDto, callback) => {
    Log.i(`Received action performed by ${_data.userId}, executing ${_data.abilityId}`)
    const incursion = incursionManager.getIncursionFromCharacterId(socket.data.userId)

    if (!incursion) {
      Log.e(`Failed to get incursion for ${socket.data.userId}`)
      callback(false)
      return
    }

    const existingEntity = incursion.currentRoom.entities.find((e) => e.entity._id.toString() === _data.userId)

    if (!existingEntity) {
      Log.e(`Failed to find entity ${_data.userId} on action performed`)
      callback(false)
      return
    }

    const ability = existingEntity.abilities().find((a) => a.props.abilityId === _data.abilityId)

    if (!ability) {
      Log.e(`Failed to find ability ${_data.abilityId} for entity ${existingEntity.entity._id.toString()} on action performed`)
      callback(false)
      return
    }

    incursion.queueAction(existingEntity, ability, _data)
    callback(true)
  }))

  function getCharacter(manager: CharacterManager, socket: Socket) {
    const userId = socket.data.userId
    const character = manager.get(userId)

    return character
  }
}

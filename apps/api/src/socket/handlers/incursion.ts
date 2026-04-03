import type { IActionAbilityContextDto } from '@incursion/dto'
import type { Server, Socket } from 'socket.io'
import type IncursionManager from '../../managers/IncursionManager'
import IncursionGenerator from '../../generators/IncursionGenerator'
import CharacterMapper from '../../mappers/entity/CharacterMapper'
import IncursionMapper from '../../mappers/incursion/IncursionMapper'
import IncursionTemplateMapper from '../../mappers/incursion/IncursionTemplateMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { IncursionInstanceModel } from '../../models/schemas/incursion/IncursionInstanceSchema'
import { IncursionTemplateModel } from '../../models/schemas/incursion/IncursionTemplateSchema'
import { safeHandler } from './safeHandler'

export function registerIncursionHandlers(io: Server, socket: Socket, incursionManager: IncursionManager) {
  socket.on('incursion:begin', safeHandler(async (_data, callback) => {
    const characterDoc = await CharacterModel.findOne({
      owner: socket.data.userId
    }).lean()

    if (!characterDoc) {
      console.error('Failed to find character when beginning incursion')
      callback(null)
      return
    }

    const character = await CharacterMapper.toDomain(characterDoc)

    // temporarily just take the first template
    const templateDoc = await IncursionTemplateModel.findOne().lean()

    if (!templateDoc) {
      console.error('Failed to find suitable template when beginning incursion')
      callback(null)
      return
    }

    const template = IncursionTemplateMapper.toDomain(templateDoc)
    const result = IncursionGenerator.generateIncursion(template, character)
    const toDb = IncursionMapper.toDb(result)
    const toDto = IncursionMapper.toDto(result)

    try {
      const saved = await IncursionInstanceModel.create({
        incursionId: toDb.incursionId,
        name: toDb.name,
        level: toDb.level,
        rooms: toDb.rooms,
        currentRoom: toDb.currentRoom,
        theme: toDb.theme
      })

      await CharacterModel.updateOne(
        { _id: characterDoc._id },
        { $set: {
          currentIncursion: saved._id
        } }
      )

      incursionManager.addIncursion(character.entityId, saved._id.toString(), result)
      socket.join(saved._id.toString())

      callback(toDto)
    } catch (err) {
      console.error('Failed to save incursion', err)
      callback(null)
    }
  }))

  socket.on('incursion:startTicking', safeHandler(async (_data, callback) => {
    const characterDoc = await CharacterModel.findOne({
      owner: socket.data.userId
    }).lean()

    if (characterDoc == null) {
      console.error('Failed to find character when starting incursion ticking')
      callback(null)
      return
    }

    const character = await CharacterMapper.toDomain(characterDoc)
    const incursionId = characterDoc.currentIncursion

    if (!incursionId) {
      console.error(`Failed to start ticking incursion for character ${characterDoc._id}`)
      callback(null)
      return
    }

    // eslint-disable-next-line no-console
    console.log(`Received start ticking request from ${character.name} for incursion ${incursionId.toString()}`)

    let existingIncursion = incursionManager.getIncursion(incursionId.toString())

    if (!existingIncursion) {
      // just add it to the manager
      const currentIncursion = character.currentIncursion

      if (!currentIncursion) {
        console.error(`Current incursion does not exist for character ${characterDoc._id} on server, but it exists on db.`)
        callback(null)
        return
      }

      incursionManager.addIncursion(character.entityId, incursionId.toString(), currentIncursion)
      existingIncursion = incursionManager.getIncursion(incursionId.toString())
    }

    existingIncursion!.active = true

    socket.join(incursionId.toString())
  }))

  socket.on('incursion:actionPerformed', safeHandler(async (_data: IActionAbilityContextDto, callback) => {
    const incursion = incursionManager.getIncursionFromCharacterId(socket.data.userId)

    if (!incursion) {
      console.error(`Failed to get incursion for ${socket.data.userId}`)
      callback(false)
      return
    }

    const existingEntity = incursion.currentRoom.entities.find((e) => e.entity.entityId === _data.userId)

    if (!existingEntity) {
      console.error(`Failed to find entity ${_data.userId} on action performed`)
      callback(false)
      return
    }

    const ability = existingEntity.abilities().find((a) => a.abilityId === _data.abilityId)

    if (!ability) {
      console.error(`Failed to find ability ${_data.abilityId} for entity ${existingEntity.entity.entityId} on action performed`)
      callback(false)
      return
    }

    incursion.queueAction(existingEntity, ability, _data)
  }))
}

import type { Server, Socket } from 'socket.io'
import IncursionGenerator from '../../generators/IncursionGenerator'
import CharacterMapper from '../../mappers/entity/CharacterMapper'
import IncursionMapper from '../../mappers/incursion/IncursionMapper'
import IncursionTemplateMapper from '../../mappers/incursion/IncursionTemplateMapper'
import { CharacterModel } from '../../models/schemas/entity/CharacterSchema'
import { IncursionInstanceModel } from '../../models/schemas/incursion/IncursionInstanceSchema'
import { IncursionTemplateModel } from '../../models/schemas/incursion/IncursionTemplateSchema'
import { safeHandler } from './safeHandler'

export function registerIncursionHandlers(io: Server, socket: Socket) {
  socket.on('incursion:begin', safeHandler(async (_data, callback) => {
    const characterDoc = await CharacterModel.findOne({
      owner: socket.data.userId
    }).lean()

    if (characterDoc == null) {
      console.error('Failed to find character when beginning incursion')
      callback()
      return
    }

    const character = await CharacterMapper.toDomain(characterDoc)

    // temporarily just take the first template
    const templateDoc = await IncursionTemplateModel.findOne().lean()

    if (templateDoc == null) {
      console.error('Failed to find suitable template when beginning incursion')
      callback()
      return
    }

    const template = IncursionTemplateMapper.toDomain(templateDoc)
    const result = IncursionGenerator.generateIncursion(template, character)
    const toDb = IncursionMapper.toDb(result)

    try {
      const saved = await IncursionInstanceModel.create({
        incursionId: toDb.incursionId,
        name: toDb.name,
        level: toDb.level,
        rooms: toDb.rooms,
        currentRoom: toDb.currentRoom,
        theme: toDb.theme
      })

      // eslint-disable-next-line no-console
      console.log('saved', saved)
      callback(toDb) // plain object, not the mongoose doc
    } catch (err) {
      console.error('Failed to save incursion', err)
      callback()
    }
  }))
}

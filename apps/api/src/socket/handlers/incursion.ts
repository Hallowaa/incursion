import { Server, Socket } from 'socket.io'
import { CharacterModel, IncursionTemplateModel, IncursionTemplateMapper, IncursionInstanceModel, Character, IncursionGenerator, Incursion } from '../../barrel'


export function registerIncursionHandlers(io: Server, socket: Socket) {
  socket.on('incursion:begin', async (_data, callback) => {
    const characterDoc = await CharacterModel.findOne({
      owner: socket.data.userId,
    }).lean()

    if (characterDoc == null) {
      console.error('Failed to find character when beginning incursion')
      callback()
      return
    }

    const character = Character.toDomain(characterDoc)

    // temporarily just take the first template
    const templateDoc = await IncursionTemplateModel.findOne().lean()

    if (templateDoc == null) {
      console.error('Failed to find suitable template when beginning incursion')
      callback()
      return
    }

    const template = IncursionTemplateMapper.toDomain(templateDoc)
    const result = IncursionGenerator.generateIncursion(template, character)
    const toDb = Incursion.toDb(result)

    try {
      const saved = await IncursionInstanceModel.create({
        incursionId: toDb.incursionId,
        theme: toDb.theme,
        incursionContext: toDb.incursionContext,
      })
      console.log('saved', saved)
      callback(toDb) // plain object, not the mongoose doc
    } catch (err) {
      console.error('Failed to save incursion', err)
      callback()
    }
  })
}

import type Character from '../models/domain/entity/Character'
import type IncursionContext from '../models/domain/incursion/IncursionContext'
import type IIncursionTemplate from '../models/interfaces/incursion/IIncursionTemplate'
import { AdversaryId, EntityStatId, IncursionRoomType } from '@incursion/dto'
import Entity from '../models/domain/entity/Entity'
import EntityStat from '../models/domain/entity/EntityStat'
import Incursion from '../models/domain/incursion/Incursion'
import IncursionRoom from '../models/domain/incursion/IncursionRoom'

// The doc sent to the database is created by the mapper!
export default class IncursionGenerator {
  public static generateIncursion(
    template: IIncursionTemplate,
    character: Character
  ) {
    const context: IncursionContext = {
      name: template.name,
      level: character.experience,
      rooms: [
        new IncursionRoom(IncursionRoomType.FIGHT, [
          new Entity({
            entityId: AdversaryId.GHOUL,
            name: 'Ghoul',
            stats: [new EntityStat(EntityStatId.HEALTH, 15, [])]
          })
        ])
      ]
    }
    return new Incursion(template.incursionId, template.theme, context)
  }
}

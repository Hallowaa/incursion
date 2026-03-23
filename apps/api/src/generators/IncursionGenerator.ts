import type Character from '../models/domain/entity/Character'
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
    const rooms = [
      new IncursionRoom(IncursionRoomType.FIGHT, [
        character,
        new Entity({
          entityId: AdversaryId.GHOUL,
          name: 'Ghoul',
          stats: [new EntityStat(EntityStatId.HEALTH, 15, [])]
        })
      ])
    ]

    const levelDiff = template.maxLevel - template.minLevel
    const level = template.minLevel + Math.floor(Math.random() * levelDiff)
    return new Incursion(template.incursionId, template.name, level, rooms, rooms[0], template.theme)
  }
}

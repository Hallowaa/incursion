import type Character from '../models/domain/entity/Character'
import type IIncursionTemplate from '../models/interfaces/incursion/IIncursionTemplate'
import { AdversaryId, EntityKind, IncursionRoomType } from '@incursion/dto'
import mongoose from 'mongoose'
import Entity from '../models/domain/entity/Entity'
import IncursionInstanceEntity from '../models/domain/entity/IncursionInstanceEntity'
import Incursion from '../models/domain/incursion/Incursion'
import IncursionRoom from '../models/domain/incursion/IncursionRoom'
import Position from '../models/domain/incursion/Position'

// The doc sent to the database is created by the mapper!
export default class IncursionGenerator {
  public static generateIncursion(
    template: IIncursionTemplate,
    character: Character
  ) {
    const rooms = [
      new IncursionRoom(IncursionRoomType.FIGHT, 10, 10, [
        new IncursionInstanceEntity(
          character,
          new Position(0, 0)
        ),
        new IncursionInstanceEntity(
          new Entity(
            {
              kind: EntityKind.ADVERSARY,
              entityId: new mongoose.Types.ObjectId().toString(),
              name: AdversaryId.GHOUL,
              stats: []
            }
          ),
          new Position(3, 3)
        )
      ])
    ]

    const levelDiff = template.maxLevel - template.minLevel
    const level = template.minLevel + Math.floor(Math.random() * levelDiff)
    return new Incursion(new mongoose.Types.ObjectId().toString(), template.name, level, rooms, rooms[0], template.theme)
  }
}

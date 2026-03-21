import type { IncursionRoomType } from '@incursion/dto'
import type Entity from '../entity/Entity'

export default class IncursionRoom {
  type: IncursionRoomType
  entities: Entity[]

  public constructor(type: IncursionRoomType, entities: Entity[]) {
    this.type = type
    this.entities = structuredClone(entities)
  }
}

import type { IncursionRoomType } from '@incursion/dto'
import type Entity from '../entity/Entity'

export default class IncursionRoom {
  public constructor(public type: IncursionRoomType, public entities: Entity[]) {

  }
}

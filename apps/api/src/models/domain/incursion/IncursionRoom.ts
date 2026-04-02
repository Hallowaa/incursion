import type { IncursionRoomType } from '@incursion/dto'
import IncursionInstanceEntity from '../entity/IncursionInstanceEntity'

export default class IncursionRoom {
  public constructor(
    public type: IncursionRoomType,
    public width: number,
    public height: number,
    public entities: IncursionInstanceEntity[]
  ) {}

  public static clone(room: IncursionRoom): IncursionRoom {
    return new IncursionRoom(
      room.type,
      room.width,
      room.height,
      room.entities.map((e) => IncursionInstanceEntity.clone(e))
    )
  }
}

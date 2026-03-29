import type { IncursionRoomType } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'

export default class IncursionRoom {
  public constructor(
    public type: IncursionRoomType,
    public width: number,
    public height: number,
    public entities: IncursionInstanceEntity[]
  ) {}
}

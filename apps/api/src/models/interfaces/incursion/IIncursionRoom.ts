import type { IncursionRoomType } from '@incursion/dto'
import type IEntity from '../entity/IEntity'

export default interface IIncursionRoom {
  type: IncursionRoomType
  entities: IEntity[]
}

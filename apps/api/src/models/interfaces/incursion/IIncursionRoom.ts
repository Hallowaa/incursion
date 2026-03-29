import type { IncursionRoomType } from '@incursion/dto'
import type IIncursionInstanceEntity from '../entity/IIncursionInstanceEntity'

export default interface IIncursionRoom {
  type: IncursionRoomType
  width: number
  height: number
  entities: IIncursionInstanceEntity[]
}

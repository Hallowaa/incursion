import type IPosition from '../incursion/IPosition'
import type IEntity from './IEntity'

export default interface IIncursionInstanceEntity {
  entity: IEntity
  position: IPosition
}

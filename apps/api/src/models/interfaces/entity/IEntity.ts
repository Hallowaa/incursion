import type IPosition from '../incursion/IPosition'
import type IEntityStat from './IEntityStat'

export default interface IEntity {
  entityId: string
  name: string
  stats: IEntityStat[]
  position: IPosition | undefined
}

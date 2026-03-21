import type IEntityStat from './IEntityStat'

export default interface IEntity {
  entityId: string
  name: string
  stats: IEntityStat[]
}

import type { EntityKind } from '@incursion/dto'
import type IEntityStat from './IEntityStat'

export default interface IEntity {
  kind: EntityKind
  entityId: string
  name: string
  stats: IEntityStat[]
}

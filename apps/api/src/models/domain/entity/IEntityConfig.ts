import type { EntityKind } from '@incursion/dto'
import type EntityStat from './EntityStat'

export default interface IEntityConfig {
  kind: EntityKind
  entityId: string
  name: string
  stats: EntityStat[]
}

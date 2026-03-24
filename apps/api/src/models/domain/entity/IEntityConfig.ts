import type Position from '../incursion/Position'
import type EntityStat from './EntityStat'

export default interface IEntityConfig {
  entityId: string
  name: string
  stats: EntityStat[]
  position: Position | undefined
}

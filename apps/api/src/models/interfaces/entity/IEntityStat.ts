import type { EntityStatId } from '@incursion/dto'
import type IEntityStatBuff from './IEntityStatBuff'

// Used for translating between doc and domain object
export default interface IEntityStat {
  statId: EntityStatId
  baseValue: number
  buffs: IEntityStatBuff[]
}

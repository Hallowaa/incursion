import { IEntityStatBuff } from "../../../barrel"

// Used for translating between doc and domain object
export default interface IEntityStat {
  statId: string
  baseValue: number
  buffs: IEntityStatBuff[]
}

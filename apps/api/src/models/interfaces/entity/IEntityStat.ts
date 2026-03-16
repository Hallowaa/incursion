import IEntityStatBuff from "./IEntityStatBuff"

// Used for translating between doc and domain object
export default interface IEntityStat {
  statId: string
  baseValue: number
  buffs: IEntityStatBuff[]
}

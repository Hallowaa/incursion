import { EntityStatBuff } from '@/barrel'

export default class EntityStat {
  public constructor(
    public statId: string,
    public baseValue: number,
    public buffs: EntityStatBuff[]
  ) {}

  public static fromDb(doc: EntityStat) {
    return new EntityStat(
      doc.statId,
      doc.baseValue,
      doc.buffs.map((buff) => EntityStatBuff.fromDb(buff))
    )
  }

  public get displayName(): string {
    return this.statId
      .toLocaleUpperCase()
      .replace('STAT_', '')
      .replaceAll('_', ' ')
  }

  public get currentValue(): number {
    let result = this.baseValue

    // first apply additive values to base
    this.buffs.forEach((buff) => {
      if (buff.isAdditive === true) {
        result += buff.flatValue
      }
    })

    // second apply percentual values to base
    this.buffs.forEach((buff) => {
      if (buff.isAdditive === false) {
        result *= buff.percentualValue
      }
    })

    return result
  }
}

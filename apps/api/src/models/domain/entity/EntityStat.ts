import type { EntityStatId } from '@incursion/dto'
import type EntityStatBuff from './EntityStatBuff'

export default class EntityStat {
  public constructor(
    public statId: EntityStatId,
    public baseValue: number,
    public buffs: EntityStatBuff[]
  ) {}

  public get currentValue() {
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

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

  public addBuff(buff: EntityStatBuff) {
    const existingBuff = this.buffs.find((b) => b.name === buff.name)
    if (existingBuff) {
      existingBuff.flatValue = buff.flatValue
      existingBuff.imageUrl = buff.imageUrl
      existingBuff.isAdditive = buff.isAdditive
      existingBuff.percentualValue = buff.percentualValue

      return
    }

    this.buffs.push(buff)
  }
}

import { EntityStatId } from "@incursion/dto"
import IEntityStat from "../../interfaces/entity/IEntityStat"
import EntityStatBuff from "./EntityStatBuff"


export default class EntityStat {
  public constructor(
    public statId: EntityStatId,
    private _baseValue: number,
    private _buffs: EntityStatBuff[],
  ) {}

  public static toDomain(doc: IEntityStat) {
    return new EntityStat(doc.statId, doc.baseValue, doc.buffs)
  }

  public get currentValue() {
    let result = this._baseValue

    // first apply additive values to base
    this._buffs.forEach((buff) => {
      if (buff.isAdditive === true) {
        result += buff.flatValue
      }
    })

    // second apply percentual values to base
    this._buffs.forEach((buff) => {
      if (buff.isAdditive === false) {
        result *= buff.percentualValue
      }
    })

    return result
  }
}

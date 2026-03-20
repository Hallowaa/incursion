import type { CharacterClassId, ICharacterDto } from '@incursion/dto'
import Inventory from '../item/Inventory'
import EntityStat from './EntityStat'
import PassivePointsSpent from './PassivePointsSpent'

export default class Character {
  public constructor(
    public name: string,
    public experience: number,
    public classes: CharacterClassId[],
    public inventory: Inventory,
    public passivePointsSpent: PassivePointsSpent[],
    public stats: EntityStat[]
  ) {}

  public static toDomain(doc: ICharacterDto) {
    return new Character(
      doc.name,
      doc.experience,
      doc.classes,
      Inventory.toDomain(doc.inventory),
      doc.passivePointsSpent.map((pps) => PassivePointsSpent.toDomain(pps)),
      doc.stats.map((stat) => EntityStat.toDomain(stat))
    )
  }
}

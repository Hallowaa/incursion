import type Inventory from '../item/Inventory'
import type { CharacterClass } from './CharacterClass'
import EntityStat from './EntityStat'
import PassivePointsSpent from './PassivePointsSpent'

export default class Character {
  public constructor(
    public name: string,
    public experience: number,
    public classes: CharacterClass[],
    public inventory: Inventory,
    public passivePointsSpent: PassivePointsSpent[],
    public stats: EntityStat[]
  ) {}

  public static toDomain(doc: Character) {
    return new Character(
      doc.name,
      doc.experience,
      doc.classes,
      doc.inventory,
      doc.passivePointsSpent.map((pps) => PassivePointsSpent.fromDb(pps)),
      doc.stats.map((stat) => EntityStat.fromDb(stat))
    )
  }
}

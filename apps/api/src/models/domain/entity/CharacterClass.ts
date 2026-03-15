import { Ability, AbilityMapper, EntityStat, ICharacterClass } from "../../../barrel"

export default class CharacterClass {
  public name: string
  public stats: EntityStat[]
  public abilities: Ability[]

  public constructor(name: string, stats: EntityStat[], abilities: Ability[]) {
    this.name = name
    this.stats = stats
    this.abilities = abilities
  }

  public static toDomain(doc: ICharacterClass) {
    return new CharacterClass(
      doc.name,
      doc.stats.map((s) => EntityStat.toDomain(s)),
      doc.abilities.map((a) => AbilityMapper.toDomain(a)),
    )
  }
}

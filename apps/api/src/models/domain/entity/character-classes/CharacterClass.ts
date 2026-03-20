import { CharacterClassId } from "@incursion/dto"
import AbilityMapper from "../../../../mappers/ability/AbilityMapper"
import ICharacterClass from "../../../interfaces/entity/ICharacterClass"
import Ability from "../../ability/Ability"
import EntityStat from "../EntityStat"


export default class CharacterClass {
  public name: string
  public stats: EntityStat[]
  public abilities: Ability[]
  public advancements: CharacterClassId[] = [
    CharacterClassId.ROGUE,
    CharacterClassId.WARRIOR,
    CharacterClassId.MAGE
  ]

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

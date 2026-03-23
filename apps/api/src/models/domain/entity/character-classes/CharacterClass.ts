import type Ability from '../../ability/Ability'
import type EntityStat from '../EntityStat'
import { CharacterClassId } from '@incursion/dto'
import AbilityMove from '../../ability/abilities/AbilityMove'

export default class CharacterClass {
  public name: CharacterClassId
  public stats: EntityStat[]
  public abilities: Ability[] = [
    new AbilityMove()
  ]

  public advancements: CharacterClassId[] = [
    CharacterClassId.ROGUE,
    CharacterClassId.WARRIOR,
    CharacterClassId.MAGE
  ]

  public description = ''

  public constructor(name: CharacterClassId, stats: EntityStat[], abilities: Ability[], advancements?: CharacterClassId[], description?: string) {
    this.name = name
    this.stats = stats
    this.abilities = abilities

    if (advancements) {
      this.advancements = advancements
    }

    if (description) {
      this.description = description
    }
  }
}

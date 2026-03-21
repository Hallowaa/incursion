import type Ability from '../../ability/Ability'
import { CharacterClassId, EntityStatId } from '@incursion/dto'
import EntityStat from '../EntityStat'
import CharacterClass from './CharacterClass'

export default class RogueClass extends CharacterClass {
  public constructor() {
    const name = CharacterClassId.ROGUE
    const stats = [
      new EntityStat(EntityStatId.DEXTERITY, 13, []),
      new EntityStat(EntityStatId.STRENGTH, 9, []),
      new EntityStat(EntityStatId.INTELLIGENCE, 4, [])
    ]
    const abilities: Ability[] = []
    const advancements: CharacterClassId[] = []
    const description = 'This world is cold. Bathe it in the warmth of blood.'

    super(name, stats, abilities, advancements, description)
  }
}

import type Ability from '../../ability/Ability'
import { CharacterClassId, EntityStatId } from '@incursion/dto'
import EntityStat from '../EntityStat'
import CharacterClass from './CharacterClass'

export default class WarriorClass extends CharacterClass {
  public constructor() {
    const name = CharacterClassId.WARRIOR
    const stats = [
      new EntityStat(EntityStatId.DEXTERITY, 6, []),
      new EntityStat(EntityStatId.STRENGTH, 19, []),
      new EntityStat(EntityStatId.INTELLIGENCE, 1, []),
      new EntityStat(EntityStatId.MOVEMENT_SPEED, 0, []),
      new EntityStat(EntityStatId.HEALTH, 50, [])
    ]
    const abilities: Ability[] = []
    const advancements: CharacterClassId[] = []
    const description = 'Only in battle do we find true meaning.'

    super(name, stats, abilities, advancements, description)
  }
}

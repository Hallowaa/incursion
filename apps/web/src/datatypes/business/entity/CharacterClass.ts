import type { CharacterClassId } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type EntityStat from './EntityStat'

export default class CharacterClass {
  public constructor(
    public name: CharacterClassId,
    public stats: EntityStat[],
    public abilities: Ability[],
    public description: string
  ) {}
}

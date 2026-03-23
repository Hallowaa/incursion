import type { ICharacterClassDto } from '@incursion/dto'
import type Inventory from '../item/Inventory'
import type EntityStat from './EntityStat'
import type PassivePointsSpent from './PassivePointsSpent'

export default class Character {
  public constructor(
    public name: string,
    public experience: number,
    public classes: ICharacterClassDto[], // TODO: make own class obj
    public inventory: Inventory,
    public passivePointsSpent: PassivePointsSpent[],
    public stats: EntityStat[]
  ) {}
}

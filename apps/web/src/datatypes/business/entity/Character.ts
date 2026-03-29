import type { ICharacterClassDto } from '@incursion/dto'
import type Incursion from '../incursion/Incursion'
import type Inventory from '../item/Inventory'
import type EntityStat from './EntityStat'
import type PassivePointsSpent from './PassivePointsSpent'
import { EntityKind } from '@incursion/dto'
import Entity from './Entity'

export default class Character extends Entity {
  public constructor(
    public name: string,
    public experience: number,
    public classes: ICharacterClassDto[], // TODO: make own class obj
    public inventory: Inventory,
    public passivePointsSpent: PassivePointsSpent[],
    public stats: EntityStat[],
    public currentIncursion: Incursion | undefined
  ) {
    super(
      EntityKind.CHARACTER,
      'character',
      name,
      stats
    )
  }
}

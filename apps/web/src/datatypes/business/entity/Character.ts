import type Ability from '../ability/Ability'
import type Incursion from '../incursion/Incursion'
import type Inventory from '../item/Inventory'
import type CharacterClass from './CharacterClass'
import type EntityStat from './EntityStat'
import type PassivePointsSpent from './PassivePointsSpent'
import { EntityKind } from '@incursion/dto'
import Entity from './Entity'

export default class Character extends Entity {
  public constructor(
    public _id: string,
    public name: string,
    public experience: number,
    public classes: CharacterClass[], // TODO: make own class obj
    public inventory: Inventory,
    public passivePointsSpent: PassivePointsSpent[],
    public stats: EntityStat[],
    public currentIncursion: Incursion | undefined
  ) {
    super(
      _id,
      EntityKind.CHARACTER,
      name,
      stats
    )
  }

  public getAbilities(): Ability[] {
    const result = []

    for (const c of this.classes) {
      result.push(...c.abilities)
    }

    return result
  }
}

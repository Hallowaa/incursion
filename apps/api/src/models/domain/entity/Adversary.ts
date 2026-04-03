import type Ability from '../ability/Ability'
import type IAdversaryConfig from './IAdversaryConfig'
import Entity from './Entity'

export default class Adversary extends Entity {
  public abilities: Ability[]
  public constructor(config: IAdversaryConfig) {
    super(config)
    this.abilities = config.abilities
  }

  public getAbilities(): Ability[] {
    return this.abilities
  }
}

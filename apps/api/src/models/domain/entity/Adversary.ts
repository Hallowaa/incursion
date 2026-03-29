import type Ability from '../ability/Ability'
import type IAdversaryConfig from './IAdversaryConfig'
import { EntityKind } from '@incursion/dto'
import Entity from './Entity'

export default class Adversary extends Entity {
  public abilities: Ability[]
  public constructor(config: IAdversaryConfig) {
    super({ ...config, kind: EntityKind.ADVERSARY })
    this.abilities = config.abilities
  }
}

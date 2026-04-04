import type { EntityKind } from '@incursion/dto'
import type mongoose from 'mongoose'
import type Ability from '../ability/Ability'
import type EntityStat from './EntityStat'
import type IEntityConfig from './IEntityConfig'

export default class Entity {
  public _id: mongoose.Types.ObjectId
  public kind: EntityKind
  public name: string
  public stats: EntityStat[]

  public constructor(config: IEntityConfig) {
    this._id = config._id
    this.kind = config.kind
    this.name = config.name
    this.stats = config.stats
  }

  public getAbilities(): Ability[] {
    return []
  }

  public computeStats() {}
}

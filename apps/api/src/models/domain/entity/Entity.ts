import type EntityStat from './EntityStat'
import type IEntityConfig from './IEntityConfig'

export default class Entity {
  public entityId: string
  public name: string
  public stats: EntityStat[]

  public constructor(config: IEntityConfig) {
    this.entityId = config.entityId
    this.name = config.name
    this.stats = config.stats
  }
}

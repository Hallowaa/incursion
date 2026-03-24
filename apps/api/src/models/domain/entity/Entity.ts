import type Position from '../incursion/Position'
import type EntityStat from './EntityStat'
import type IEntityConfig from './IEntityConfig'

export default class Entity {
  public entityId: string
  public name: string
  public stats: EntityStat[]
  public position: Position | undefined

  public constructor(config: IEntityConfig) {
    this.entityId = config.entityId
    this.name = config.name
    this.stats = config.stats
    this.position = config.position
  }
}

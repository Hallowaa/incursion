import type { EntityKind } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type IEntityConfig from './IEntityConfig'
import EntityStat from './EntityStat'

export default class Entity {
  public kind: EntityKind
  public entityId: string
  public name: string
  public stats: EntityStat[]

  public constructor(config: IEntityConfig) {
    this.kind = config.kind
    this.entityId = config.entityId
    this.name = config.name
    this.stats = config.stats
  }

  public static clone(entity: Entity): Entity {
    return new Entity({
      kind: entity.kind,
      entityId: entity.entityId,
      name: entity.name,
      stats: entity.stats.map((s) => EntityStat.clone(s))
    })
  }

  public getAbilities(): Ability[] {
    return []
  }

  public computeStats() {}
}

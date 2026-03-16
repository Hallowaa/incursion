import EntityStat from "./EntityStat"
import IEntityConfig from "./IEntityConfig"

export default class Entity {
  public entityId: string
  public name: string
  public stats: EntityStat[]
  public cooldowns: Record<string, number> = {}

  public constructor(config: IEntityConfig) {
    this.entityId = config.entityId
    this.name = config.name
    this.stats = structuredClone(config.stats)
  }
}

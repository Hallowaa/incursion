import { EntityStat } from "../../../barrel"

export default interface EntityConfig {
  entityId: string
  name: string
  stats: EntityStat[]
}

import { IEntityStat } from "../../../barrel"

export default interface IEntity {
  entityId: string
  name: string
  stats: IEntityStat[]
}

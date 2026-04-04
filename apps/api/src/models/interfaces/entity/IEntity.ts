import type { EntityKind } from '@incursion/dto'
import type mongoose from 'mongoose'
import type IEntityStat from './IEntityStat'

export default interface IEntity {
  _id: mongoose.Types.ObjectId
  kind: EntityKind
  name: string
  stats: IEntityStat[]
}

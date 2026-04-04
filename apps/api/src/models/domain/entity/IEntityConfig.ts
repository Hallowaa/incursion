import type { EntityKind } from '@incursion/dto'
import type mongoose from 'mongoose'
import type EntityStat from './EntityStat'

export default interface IEntityConfig {
  _id: mongoose.Types.ObjectId
  kind: EntityKind
  name: string
  stats: EntityStat[]
}

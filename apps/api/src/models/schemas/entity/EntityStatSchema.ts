import { Schema } from 'mongoose'
import IEntityStat from '../../interfaces/entity/IEntityStat'
import { EntityStatBuffSchema } from './EntityStatBuffSchema'

export const EntityStatSchema = new Schema<IEntityStat>({
  statId: { type: String, required: true },
  baseValue: { type: Number, default: 0 },
  buffs: { type: [EntityStatBuffSchema], default: [] },
})

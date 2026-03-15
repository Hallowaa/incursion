import { Schema } from 'mongoose'
import { EntityStatBuffSchema, IEntityStat } from '../../../barrel'

export const EntityStatSchema = new Schema<IEntityStat>({
  statId: { type: String, required: true },
  baseValue: { type: Number, default: 0 },
  buffs: { type: [EntityStatBuffSchema], default: [] },
})

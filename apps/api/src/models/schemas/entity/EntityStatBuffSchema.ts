import type IEntityStatBuff from '../../interfaces/entity/IEntityStatBuff'
import { Schema } from 'mongoose'

export const EntityStatBuffSchema = new Schema<IEntityStatBuff>({
  name: { type: String, required: true },
  flatValue: { type: Number, default: 0 },
  percentualValue: { type: Number, default: 1 },
  isAdditive: { type: Boolean, required: true },
  imageUrl: { type: String, default: '' }
})

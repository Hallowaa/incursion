import { model, Schema } from 'mongoose'
import { IEntityStatBuff } from '../../../barrel'

export const EntityStatBuffSchema = new Schema<IEntityStatBuff>({
  name: { type: String, required: true },
  flatValue: { type: Number, default: 0 },
  percentualValue: { type: Number, default: 1 },
  isAdditive: { type: Boolean, required: true },
})

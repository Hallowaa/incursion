import { model, Schema } from 'mongoose'
import { IPassivePointsSpent } from '../../../barrel'

export const PassivePointsSpentSchema = new Schema<IPassivePointsSpent>({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
})

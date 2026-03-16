import { Schema } from 'mongoose'
import IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'

export const PassivePointsSpentSchema = new Schema<IPassivePointsSpent>({
  name: { type: String, required: true },
  amount: { type: Number, default: 0 },
})

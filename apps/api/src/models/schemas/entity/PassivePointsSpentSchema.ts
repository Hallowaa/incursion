import type IPassivePointsSpent from '../../interfaces/entity/IPassivePointsSpent'
import { Schema } from 'mongoose'

export const PassivePointsSpentSchema = new Schema<IPassivePointsSpent>({
  name: { type: String, required: true },
  value: { type: Number, default: 0 }
})

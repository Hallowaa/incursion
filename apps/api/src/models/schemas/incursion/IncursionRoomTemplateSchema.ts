import type IIncursionRoomTemplate from '../../interfaces/incursion/IIncursionRoomTemplate'
import { IncursionRoomType } from '@incursion/dto'
import { Schema } from 'mongoose'

export const IncursionRoomTemplateSchema = new Schema<IIncursionRoomTemplate>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true
  },
  weight: { type: Number, default: 0 }
})

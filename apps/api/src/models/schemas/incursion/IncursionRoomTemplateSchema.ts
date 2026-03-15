import { Schema } from 'mongoose'
import { IIncursionRoomTemplate, IncursionRoomType } from '../../../barrel'

export const IncursionRoomTemplateSchema = new Schema<IIncursionRoomTemplate>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true,
  },
  weight: { type: Number, default: 0 },
})

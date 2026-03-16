import { Schema } from 'mongoose'
import { IncursionRoomType } from '../../domain/enums/IncursionRoomType'
import IIncursionRoomTemplate from '../../interfaces/incursion/IIncursionRoomTemplate'

export const IncursionRoomTemplateSchema = new Schema<IIncursionRoomTemplate>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true,
  },
  weight: { type: Number, default: 0 },
})

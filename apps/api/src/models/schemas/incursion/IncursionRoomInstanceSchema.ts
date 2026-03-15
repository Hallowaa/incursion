import { Schema } from 'mongoose'
import { EntitySchema, IIncursionRoom, IncursionRoomType } from '../../../barrel'

export const IncursionRoomInstanceSchema = new Schema<IIncursionRoom>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true,
  },
  entities: { type: [EntitySchema], default: [] },
})

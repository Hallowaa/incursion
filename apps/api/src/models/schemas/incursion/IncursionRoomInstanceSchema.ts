import type IIncursionRoom from '../../interfaces/incursion/IIncursionRoom'
import { IncursionRoomType } from '@incursion/dto'
import { Schema } from 'mongoose'
import { IncursionInstanceEntitySchema } from '../entity/IncursionInstanceEntitySchema'

export const IncursionRoomInstanceSchema = new Schema<IIncursionRoom>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true
  },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  entities: { type: [IncursionInstanceEntitySchema], default: [] }
})

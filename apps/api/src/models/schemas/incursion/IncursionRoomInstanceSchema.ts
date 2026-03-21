import type IIncursionRoom from '../../interfaces/incursion/IIncursionRoom'
import { IncursionRoomType } from '@incursion/dto'
import { Schema } from 'mongoose'
import { EntitySchema } from '../entity/EntitySchema'

export const IncursionRoomInstanceSchema = new Schema<IIncursionRoom>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true
  },
  entities: { type: [EntitySchema], default: [] }
})

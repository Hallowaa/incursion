import { Schema } from 'mongoose'
import { IncursionRoomType } from '../../domain/enums/IncursionRoomType'
import IIncursionRoom from '../../interfaces/incursion/IIncursionRoom'
import { EntitySchema } from '../entity/EntitySchema'

export const IncursionRoomInstanceSchema = new Schema<IIncursionRoom>({
  type: {
    type: String,
    enum: Object.values(IncursionRoomType),
    required: true,
  },
  entities: { type: [EntitySchema], default: [] },
})

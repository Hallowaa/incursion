import type IIncursionContext from '../../interfaces/incursion/IIncursionContext'
import { Schema } from 'mongoose'
import { IncursionRoomInstanceSchema } from './IncursionRoomInstanceSchema'

export const IncursionContextSchema = new Schema<IIncursionContext>({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  rooms: { type: [IncursionRoomInstanceSchema], default: [] }
})

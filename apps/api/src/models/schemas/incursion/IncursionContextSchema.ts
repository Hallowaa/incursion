import { Schema } from 'mongoose'
import { IIncursionContext, IncursionRoomInstanceSchema } from '../../../barrel'


export const IncursionContextSchema = new Schema<IIncursionContext>({
  name: { type: String, required: true },
  level: { type: Number, required: true },
  rooms: { type: [IncursionRoomInstanceSchema], default: [] },
})

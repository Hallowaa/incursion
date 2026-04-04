import type IIncursionInstance from '../../interfaces/incursion/IIncursionInstance'
import { IncursionName, IncursionTheme } from '@incursion/dto'
import { model, Schema } from 'mongoose'
import { IncursionRoomInstanceSchema } from './IncursionRoomInstanceSchema'

export const IncursionInstanceSchema = new Schema<IIncursionInstance>({
  incursionId: { type: String, unique: true, required: true },
  name: { type: String, enum: Object.values(IncursionName), required: true },
  level: { type: Number, required: true },
  rooms: { type: [IncursionRoomInstanceSchema], default: [] },
  currentRoom: { type: IncursionRoomInstanceSchema, required: true },
  theme: { type: String, enum: Object.values(IncursionTheme), required: true }
})

export const IncursionInstanceModel = model(
  'IncursionInstance',
  IncursionInstanceSchema
)

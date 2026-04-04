import { AdversaryTag, IncursionName, IncursionRoomType, IncursionTheme } from '@incursion/dto'
import { model, Schema } from 'mongoose'
import { IncursionRoomTemplateSchema } from './IncursionRoomTemplateSchema'

export const IncursionTemplateSchema = new Schema({
  incursionId: { type: String, required: true, unique: true },
  name: { type: String, enum: Object.values(IncursionName), required: true },
  theme: { type: String, enum: Object.values(IncursionTheme), required: true },
  maxLevel: { type: Number, required: true },
  minLevel: { type: Number, required: true },
  roomCountRange: { type: [Number], required: true },
  possibleRooms: { type: [IncursionRoomTemplateSchema], default: [] },
  guaranteedRooms: {
    type: [String],
    enum: Object.values(IncursionRoomType),
    default: []
  },
  adversaryTags: {
    type: [String],
    enum: Object.values(AdversaryTag),
    default: []
  }
})

export const IncursionTemplateModel = model(
  'IncursionTemplate',
  IncursionTemplateSchema
)

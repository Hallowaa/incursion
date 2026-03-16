import { model, Schema } from 'mongoose'
import { AdversaryTag } from '../../domain/enums/AdversaryTag'
import { IncursionId } from '../../domain/enums/IncursionId'
import { IncursionRoomType } from '../../domain/enums/IncursionRoomType'
import { IncursionTheme } from '../../domain/enums/IncursionTheme'
import { IncursionRoomTemplateSchema } from './IncursionRoomTemplateSchema'

export const IncursionTemplateSchema = new Schema({
  incursionId: {
    type: String,
    enum: Object.values(IncursionId),
    required: true,
  },
  name: { type: String, required: true },
  theme: { type: String, enum: Object.values(IncursionTheme), required: true },
  maxLevel: { type: Number, required: true },
  minLevel: { type: Number, required: true },
  roomCountRange: { type: [Number], required: true },
  possibleRooms: { type: [IncursionRoomTemplateSchema], default: [] },
  guaranteedRooms: {
    type: [String],
    enum: Object.values(IncursionRoomType),
    default: [],
  },
  adversaryTags: {
    type: [String],
    enum: Object.values(AdversaryTag),
    default: [],
  },
})

export const IncursionTemplateModel = model(
  'IncursionTemplate',
  IncursionTemplateSchema,
)

import { model, Schema } from 'mongoose'
import { IIncursionInstance, IncursionContextSchema, IncursionId, IncursionTheme } from '../../../barrel'

export const IncursionInstanceSchema = new Schema<IIncursionInstance>({
  incursionId: {
    type: String,
    enum: Object.values(IncursionId),
    required: true,
  },
  theme: { type: String, enum: Object.values(IncursionTheme), required: true },
  incursionContext: { type: IncursionContextSchema, required: true },
})

export const IncursionInstanceModel = model(
  'IncursionInstance',
  IncursionInstanceSchema,
)

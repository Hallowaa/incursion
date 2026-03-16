import { model, Schema } from 'mongoose'
import { IncursionId } from '../../domain/enums/IncursionId'
import { IncursionTheme } from '../../domain/enums/IncursionTheme'
import IIncursionInstance from '../../interfaces/incursion/IIncursionInstance'
import { IncursionContextSchema } from './IncursionContextSchema'

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

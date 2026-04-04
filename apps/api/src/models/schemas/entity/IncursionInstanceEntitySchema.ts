import type IIncursionInstanceEntity from '../../interfaces/entity/IIncursionInstanceEntity'
import { Schema } from 'mongoose'
import { PositionSchema } from '../incursion/PositionSchema'

export const IncursionInstanceEntitySchema = new Schema<IIncursionInstanceEntity>({
  entity: { type: Schema.Types.Mixed, required: true },
  position: { type: PositionSchema, required: true }
})

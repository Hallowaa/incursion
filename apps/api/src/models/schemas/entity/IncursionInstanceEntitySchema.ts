import type IIncursionInstanceEntity from '../../interfaces/entity/IIncursionInstanceEntity'
import { Schema } from 'mongoose'
import { PositionSchema } from '../incursion/PositionSchema'
import { EntitySchema } from './EntitySchema'

export const IncursionInstanceEntitySchema = new Schema<IIncursionInstanceEntity>({
  entity: { type: EntitySchema, required: true },
  position: { type: PositionSchema, required: true }
})

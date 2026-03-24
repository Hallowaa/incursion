import type IEntity from '../../interfaces/entity/IEntity'
import { Schema } from 'mongoose'
import { PositionSchema } from '../incursion/PositionSchema'
import { EntityStatSchema } from './EntityStatSchema'

export const EntitySchema = new Schema<IEntity>({
  entityId: { type: String, required: true },
  name: { type: String, required: true },
  stats: { type: [EntityStatSchema], default: [] },
  position: { type: PositionSchema, required: false }
})

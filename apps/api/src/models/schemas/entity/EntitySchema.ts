import type IEntity from '../../interfaces/entity/IEntity'
import { Schema } from 'mongoose'
import { EntityStatSchema } from './EntityStatSchema'

export const EntitySchema = new Schema<IEntity>({
  entityId: { type: String, required: true },
  name: { type: String, required: true },
  stats: { type: [EntityStatSchema], default: [] }
})

import { Schema } from 'mongoose'
import { EntityStatSchema, IEntity } from '../../../barrel'

export const EntitySchema = new Schema<IEntity>({
  entityId: { type: String, required: true },
  name: { type: String, required: true },
  stats: { type: [EntityStatSchema], default: [] },
})

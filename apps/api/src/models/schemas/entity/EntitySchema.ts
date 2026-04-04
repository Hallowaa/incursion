import type IEntity from '../../interfaces/entity/IEntity'
import { EntityKind } from '@incursion/dto'
import mongoose, { Schema } from 'mongoose'
import { EntityStatSchema } from './EntityStatSchema'

export const EntitySchema = new Schema<IEntity>({
  kind: { type: String, required: true, enum: Object.values(EntityKind) },
  name: { type: String, required: true },
  stats: { type: [EntityStatSchema], default: [] }
}, { discriminatorKey: 'kind' })

export const EntityModel = mongoose.model('Entity', EntitySchema)

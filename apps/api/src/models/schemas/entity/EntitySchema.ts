import { Schema } from 'mongoose'
import IEntity from '../../interfaces/entity/IEntity'
import { EntityStatSchema } from './EntityStatSchema'


export const EntitySchema = new Schema<IEntity>({
  entityId: { type: String, required: true },
  name: { type: String, required: true },
  stats: { type: [EntityStatSchema], default: [] },
})

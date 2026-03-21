import { EntityStatId } from '@incursion/dto'
import { model, Schema } from 'mongoose'

export const ItemModDefinitionSchema = new Schema({
  itemModIndex: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  statId: { type: String, enum: Object.values(EntityStatId), required: true },
  isAdditive: { type: Boolean, required: true }
})

export const ItemModDefinitionModel = model('ItemModDefinition', ItemModDefinitionSchema)

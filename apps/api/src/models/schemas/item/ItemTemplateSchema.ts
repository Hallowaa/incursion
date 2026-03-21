import { ItemType } from '@incursion/dto'
import { model, Schema } from 'mongoose'

export const ItemTemplateSchema = new Schema({
  itemIndex: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: Object.values(ItemType), required: true },
  imageUrl: { type: String },
  possibleModIndices: { type: [Number], default: [] }
})

export const ItemTemplateModel = model('ItemTemplate', ItemTemplateSchema)

import { Schema } from 'mongoose'
import { ItemModSchema } from './ItemModSchema'

export const ItemSchema = new Schema({
  itemIndex: Number,
  createdAt: { type: Date, default: Date.now },
  levelRequirement: Number,
  itemMods: { type: [ItemModSchema], default: [] },
  rarity: { type: String, required: true },
})

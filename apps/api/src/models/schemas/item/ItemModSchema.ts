import { Schema } from 'mongoose'

export const ItemModSchema = new Schema({
  itemModIndex: { type: Number, required: true },
  itemValues: { type: [String], default: [] }
})

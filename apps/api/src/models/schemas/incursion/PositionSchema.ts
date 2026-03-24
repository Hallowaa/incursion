import { Schema } from 'mongoose'

export const PositionSchema = new Schema(
  { x: { type: Number, required: true }, y: { type: Number, required: true } },
  { _id: false }
)

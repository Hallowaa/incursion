import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
  refreshToken: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  passwordHash: String,
  createdAt: { type: Date, default: Date.now },
  character: { type: Schema.Types.ObjectId, ref: 'Character' },
})

export const UserModel = model('User', UserSchema)

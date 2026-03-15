import { model, Schema } from 'mongoose'
import { EntityStatSchema, ICharacter, ItemSchema, PassivePointsSpentSchema } from '../../../barrel'

export const CharacterSchema = new Schema<ICharacter>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, unique: true },
  experience: { type: Number, default: 0 },
  classes: { type: [String], default: [] },
  inventory: { type: [ItemSchema], default: [] },
  passivePointsSpent: { type: [PassivePointsSpentSchema], default: [] },
  stats: { type: [EntityStatSchema], default: [] },
  currentIncursion: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'IncursionInstance',
  },
})

export const CharacterModel = model<ICharacter>('Character', CharacterSchema)

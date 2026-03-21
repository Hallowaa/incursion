import type ICharacter from '../../interfaces/entity/ICharacter'
import { CharacterClassId } from '@incursion/dto'
import { model, Schema } from 'mongoose'
import { ItemSchema } from '../item/ItemSchema'
import { EntityStatSchema } from './EntityStatSchema'
import { PassivePointsSpentSchema } from './PassivePointsSpentSchema'

export const CharacterSchema = new Schema<ICharacter>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  name: { type: String, unique: true },
  experience: { type: Number, default: 0 },
  classes: { type: [String], default: [], enum: Object.values(CharacterClassId) },
  inventory: { type: [ItemSchema], default: [] },
  passivePointsSpent: { type: [PassivePointsSpentSchema], default: [] },
  stats: { type: [EntityStatSchema], default: [] },
  currentIncursion: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'IncursionInstance'
  }
})

export const CharacterModel = model<ICharacter>('Character', CharacterSchema)

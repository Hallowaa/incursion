import type ICharacter from '../../interfaces/entity/ICharacter'
import { CharacterClassId } from '@incursion/dto'
import { Schema } from 'mongoose'
import { ItemSchema } from '../item/ItemSchema'
import { EntityModel } from './EntitySchema'
import { PassivePointsSpentSchema } from './PassivePointsSpentSchema'

export const CharacterSchema = new Schema<ICharacter>({
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  experience: { type: Number, default: 0 },
  classes: { type: [String], default: [], enum: Object.values(CharacterClassId) },
  inventory: { type: [ItemSchema], default: [] },
  passivePointsSpent: { type: [PassivePointsSpentSchema], default: [] },
  currentIncursion: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'IncursionInstance'
  }
})

export const CharacterModel = EntityModel.discriminator('Character', CharacterSchema)

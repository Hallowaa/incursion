import type ICharacter from '../models/interfaces/entity/ICharacter'
import { CharacterClassId, EntityStatId } from '@incursion/dto'
import mongoose from 'mongoose'

export default class CharacterGenerator {
  public static generateCharacter(
    userId: string,
    characterName: string
  ): ICharacter {
    return {
      owner: new mongoose.Types.ObjectId(userId),
      name: characterName,
      experience: 0,
      classes: [
        CharacterClassId.CLASSLESS
      ],
      inventory: [],
      passivePointsSpent: [],
      stats: [
        {
          statId: EntityStatId.STRENGTH,
          baseValue: 0,
          buffs: []
        },
        {
          statId: EntityStatId.DEXTERITY,
          baseValue: 0,
          buffs: []
        },
        {
          statId: EntityStatId.INTELLIGENCE,
          baseValue: 0,
          buffs: []
        },
        {
          statId: EntityStatId.PHSYICAL_ENDURANCE,
          baseValue: 0,
          buffs: []
        },
        {
          statId: EntityStatId.MAGIC_ENDURANCE,
          baseValue: 0,
          buffs: []
        }
      ],
      currentIncursion: undefined
    }
  }
}

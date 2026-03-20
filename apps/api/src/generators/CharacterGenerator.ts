import mongoose from 'mongoose'
import ICharacter from '../models/interfaces/entity/ICharacter'
import { EntityStatId } from '@incursion/dto'

export default class CharacterGenerator {
  public static generateCharacter(
    userId: string,
    characterName: string,
  ): ICharacter {
    return {
      owner: new mongoose.Types.ObjectId(userId),
      name: characterName,
      experience: 0,
      classes: [
        'CLASSLESS'
      ],
      inventory: [],
      passivePointsSpent: [],
      stats: [
        {
          statId: EntityStatId.STRENGTH,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntityStatId.DEXTERITY,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntityStatId.INTELLIGENCE,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntityStatId.PHSYICAL_ENDURANCE,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntityStatId.MAGIC_ENDURANCE,
          baseValue: 0,
          buffs: [],
        },
      ],
      currentIncursion: undefined,
    }
  }
}

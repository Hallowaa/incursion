import mongoose from 'mongoose'
import { EntitystatId, ICharacter } from '../barrel'

export default class CharacterGenerator {
  public static generateCharacter(
    userId: string,
    characterName: string,
  ): ICharacter {
    return {
      owner: new mongoose.Types.ObjectId(userId),
      name: characterName,
      experience: 0,
      classes: [],
      inventory: [],
      passivePointsSpent: [],
      stats: [
        {
          statId: EntitystatId.STRENGTH,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntitystatId.DEXTERITY,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntitystatId.INTELLIGENCE,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntitystatId.PHSYICAL_ENDURANCE,
          baseValue: 0,
          buffs: [],
        },
        {
          statId: EntitystatId.MAGIC_ENDURANCE,
          baseValue: 0,
          buffs: [],
        },
      ],
      currentIncursion: undefined,
    }
  }
}

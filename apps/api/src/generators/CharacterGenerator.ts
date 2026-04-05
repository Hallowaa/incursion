import type ICharacter from '../models/interfaces/entity/ICharacter'
import type IEntityStat from '../models/interfaces/entity/IEntityStat'
import { CharacterClassId, EntityKind, EntityStatId } from '@incursion/dto'
import mongoose from 'mongoose'

export default class CharacterGenerator {
  public static generateCharacter(
    userId: string,
    characterName: string
  ): ICharacter {
    return {
      _id: new mongoose.Types.ObjectId(userId),
      owner: new mongoose.Types.ObjectId(userId),
      name: characterName,
      kind: EntityKind.CHARACTER,
      experience: 0,
      classes: [
        CharacterClassId.CLASSLESS
      ],
      inventory: [],
      passivePointsSpent: [],
      stats: this.generateStats(),
      currentIncursionId: undefined
    }
  }

  public static generateStats(): IEntityStat[] {
    return [
      {
        statId: EntityStatId.HEALTH,
        baseValue: 100,
        buffs: []
      },
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
      },
      {
        statId: EntityStatId.MOVEMENT_SPEED,
        baseValue: 1,
        buffs: []
      }
    ]
  }
}

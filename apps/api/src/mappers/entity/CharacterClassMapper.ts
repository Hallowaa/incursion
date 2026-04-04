import type { ICharacterClassDto } from '@incursion/dto'
import { CharacterClassId } from '@incursion/dto'
import AbilityMove from '../../models/domain/ability/abilities/AbilityMove'
import CharacterClass from '../../models/domain/entity/character-classes/CharacterClass'
import MageClass from '../../models/domain/entity/character-classes/MageClass'
import RogueClass from '../../models/domain/entity/character-classes/RogueClass'
import WarriorClass from '../../models/domain/entity/character-classes/WarriorClass'
import AbilityMapper from '../ability/AbilityMapper'
import EntityStatMapper from './EntityStatMapper'

export default class CharacterClassMapper {
  public static toDomain(className: string) {
    switch (className) {
      case CharacterClassId.MAGE: {
        return new MageClass()
      }
      case CharacterClassId.ROGUE: {
        return new RogueClass()
      }
      case CharacterClassId.WARRIOR: {
        return new WarriorClass()
      }
      case CharacterClassId.CLASSLESS: {
        return new CharacterClass(CharacterClassId.CLASSLESS, [], [new AbilityMove()])
      }
      default: {
        return new CharacterClass(CharacterClassId.UNKNOWN, [], [])
      }
    }
  }

  public static toDb(characterClass: CharacterClass) {
    return characterClass.name
  }

  public static toDto(characterClass: CharacterClass): ICharacterClassDto {
    return {
      name: characterClass.name,
      stats: characterClass.stats.map((s) => EntityStatMapper.toDto(s)),
      abilities: characterClass.abilities.map((a) => AbilityMapper.toDto(a)),
      description: characterClass.description
    }
  }
}

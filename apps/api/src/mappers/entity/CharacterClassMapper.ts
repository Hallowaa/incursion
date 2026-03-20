import { CharacterClassId } from "@incursion/dto"
import CharacterClass from "../../models/domain/entity/character-classes/CharacterClass"
import MageClass from "../../models/domain/entity/character-classes/MageClass"
import RogueClass from "../../models/domain/entity/character-classes/RogueClass"
import WarriorClass from "../../models/domain/entity/character-classes/WarriorClass"

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
        return new CharacterClass(CharacterClassId.CLASSLESS, [], [])
      }
      default: {
        return new CharacterClass('UNKNOWN', [], [])
      }
    }
  }

  public static toDb(characterClass: CharacterClass) {
    return characterClass.name
  }
}

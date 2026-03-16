import CharacterClass from "../models/domain/entity/CharacterClass"
import EntityStat from "../models/domain/entity/EntityStat"
import { EntitystatId } from "../models/domain/enums/EntityStatId"


export default class CharacterClassMapper {
  public static toDomain(className: string) {
    // TODO: make work for all classes
    return new CharacterClass(
      'Test class',
      [new EntityStat(EntitystatId.INTELLIGENCE, 1, [])],
      [],
    )
  }
}

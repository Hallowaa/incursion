import { CharacterClass, EntityStat, EntitystatId } from "../barrel";


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

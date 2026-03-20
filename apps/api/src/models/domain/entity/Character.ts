import CharacterClassMapper from "../../../mappers/entity/CharacterClassMapper"
import ICharacter from "../../interfaces/entity/ICharacter"
import CharacterClass from "./character-classes/CharacterClass"
import Entity from "./Entity"
import EntityStat from "./EntityStat"
import ICharacterConfig from "./ICharacterConfig"

export default class Character extends Entity {
  public experience: number
  public classes: CharacterClass[]
  public stats: EntityStat[]

  public constructor(config: ICharacterConfig) {
    super(config)

    this.experience = config.experience
    this.classes = structuredClone(config.classes)
    this.stats = structuredClone(config.stats)
  }

  public static toDomain(doc: ICharacter): Character {
    return new Character({
      entityId: 'character',
      name: doc.name,
      experience: doc.experience,
      classes: doc.classes.map((c) => CharacterClassMapper.toDomain(c)),
      stats: doc.stats.map((s) => EntityStat.toDomain(s)),
    })
  }

  public static toDto(doc: ICharacter) {}
}

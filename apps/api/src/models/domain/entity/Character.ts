import { CharacterClass, CharacterClassMapper, CharacterConfig, Entity, EntityStat, ICharacter } from "../../../barrel"


export default class Character extends Entity {
  public experience: number
  public classes: CharacterClass[]
  public stats: EntityStat[]

  public constructor(config: CharacterConfig) {
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

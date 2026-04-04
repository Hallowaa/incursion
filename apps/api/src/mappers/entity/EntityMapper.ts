import type { IEntityDto } from '@incursion/dto'
import type ICharacter from '../../models/interfaces/entity/ICharacter'
import type IEntity from '../../models/interfaces/entity/IEntity'
import { EntityKind } from '@incursion/dto'
import Character from '../../models/domain/entity/Character'
import Entity from '../../models/domain/entity/Entity'
import CharacterClassMapper from './CharacterClassMapper'
import CharacterMapper from './CharacterMapper'
import EntityStatMapper from './EntityStatMapper'

export default class EntityMapper {
  public static toDomain(doc: IEntity): Entity {
    if (doc.kind === EntityKind.CHARACTER) {
      const charDoc = doc as ICharacter
      return CharacterMapper.toDomain(charDoc)
    }

    return new Entity({
      _id: doc._id,
      kind: doc.kind,
      name: doc.name,
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s))
    })
  }

  public static toDto(entity: Entity): IEntityDto {
    if (entity.kind === EntityKind.CHARACTER) {
      return CharacterMapper.toDto(entity as Character)
    }

    return {
      _id: entity._id.toString(),
      kind: entity.kind,
      name: entity.name,
      stats: entity.stats.map((s) => EntityStatMapper.toDto(s))
    }
  }

  public static toDb(entity: Entity): IEntity {
    const result: any = {
      _id: entity._id,
      kind: entity.kind,
      name: entity.name,
      stats: entity.stats.map((s) => EntityStatMapper.toDb(s))
    }

    if (entity instanceof Character) {
      result.experience = entity.experience
      result.classes = entity.classes.map((c) => CharacterClassMapper.toDb(c))
      result.passivePointsSpent = entity.passivePointsSpent
    }

    return result
  }
}

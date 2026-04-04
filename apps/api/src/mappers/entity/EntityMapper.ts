import type { IEntityDto } from '@incursion/dto'
import type IEntity from '../../models/interfaces/entity/IEntity'
import { EntityKind } from '@incursion/dto'
import Character from '../../models/domain/entity/Character'
import Entity from '../../models/domain/entity/Entity'
import Inventory from '../../models/domain/entity/Inventory'
import CharacterClassMapper from './CharacterClassMapper'
import CharacterMapper from './CharacterMapper'
import EntityStatMapper from './EntityStatMapper'

export default class EntityMapper {
  public static toDomain(doc: IEntity): Entity {
    if (doc.kind === EntityKind.CHARACTER) {
      const charDoc = doc as any
      return new Character({
        kind: EntityKind.CHARACTER,
        entityId: charDoc.entityId,
        name: charDoc.name,
        experience: charDoc.experience ?? 0,
        classes: (charDoc.classes ?? []).map((c: string) => CharacterClassMapper.toDomain(c)),
        stats: (charDoc.stats ?? []).map((s: any) => EntityStatMapper.toDomain(s)),
        inventory: new Inventory([]),
        passivePointsSpent: charDoc.passivePointsSpent ?? [],
        currentIncursion: undefined
      })
    }

    return new Entity({
      kind: doc.kind,
      entityId: doc.entityId,
      name: doc.name,
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s))
    })
  }

  public static toDto(entity: Entity): IEntityDto {
    if (entity.kind === EntityKind.CHARACTER) {
      return CharacterMapper.toDto(entity as Character)
    }

    return {
      kind: entity.kind,
      entityId: entity.entityId,
      name: entity.name,
      stats: entity.stats.map((s) => EntityStatMapper.toDto(s))
    }
  }

  public static toDb(entity: Entity): IEntity {
    const result: any = {
      kind: entity.kind,
      entityId: entity.entityId,
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

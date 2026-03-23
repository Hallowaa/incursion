import type { IEntityDto } from '@incursion/dto'
import type IEntity from '../../models/interfaces/entity/IEntity'
import Entity from '../../models/domain/entity/Entity'
import EntityStatMapper from './EntityStatMapper'

export default class EntityMapper {
  public static toDomain(doc: IEntity) {
    return new Entity({
      entityId: doc.entityId,
      name: doc.name,
      stats: doc.stats.map((s) => EntityStatMapper.toDomain(s))
    })
  }

  public static toDto(entity: Entity): IEntityDto {
    return {
      entityId: entity.entityId,
      name: entity.name,
      stats: entity.stats.map((s) => EntityStatMapper.toDto(s))
    }
  }
}

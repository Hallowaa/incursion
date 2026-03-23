import type { IEntityDto } from '@incursion/dto'
import Entity from '@/datatypes/business/entity/Entity'
import EntityStatMapper from './EntityStatMapper'

export default class EntityMapper {
  public static toDomain(dto: IEntityDto) {
    return new Entity(
      dto.entityId,
      dto.name,
      dto.stats.map((s) => EntityStatMapper.toDomain(s))
    )
  }
}

import type { IEntityDto } from '@incursion/dto'
import Entity from '@/datatypes/business/entity/Entity'
import EntityStatMapper from './EntityStatMapper'
import PositionMapper from './PositionMapper'

export default class EntityMapper {
  public static toDomain(dto: IEntityDto): Entity {
    return new Entity(
      dto.entityId,
      dto.name,
      dto.stats.map((s) => EntityStatMapper.toDomain(s)),
      PositionMapper.toDomain(dto.position)
    )
  }
}

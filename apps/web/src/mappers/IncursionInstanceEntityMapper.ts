import type { IIncursionInstanceEntityDto } from '@incursion/dto'
import IncursionInstanceEntity from '@/datatypes/business/entity/IncursionInstanceEntity'
import EntityMapper from './EntityMapper'
import PositionMapper from './PositionMapper'

export default class IncursionInstanceEntityMapper {
  public static toDomain(dto: IIncursionInstanceEntityDto) {
    return new IncursionInstanceEntity(
      EntityMapper.toDomain(dto.entity),
      PositionMapper.toDomain(dto.position)
    )
  }
}

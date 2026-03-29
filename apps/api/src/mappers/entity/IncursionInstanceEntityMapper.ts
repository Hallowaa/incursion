import type { IIncursionInstanceEntityDto } from '@incursion/dto'
import type IIncursionInstanceEntity from '../../models/interfaces/entity/IIncursionInstanceEntity'
import IncursionInstanceEntity from '../../models/domain/entity/IncursionInstanceEntity'
import PositionMapper from '../incursion/PositionMapper'
import EntityMapper from './EntityMapper'

export default class IncursionInstanceEntityMapper {
  public static toDb(iie: IncursionInstanceEntity): IIncursionInstanceEntity {
    return {
      entity: EntityMapper.toDb(iie.entity),
      position: PositionMapper.toDb(iie.position)
    }
  }

  public static toDto(iie: IncursionInstanceEntity): IIncursionInstanceEntityDto {
    return {
      entity: EntityMapper.toDto(iie.entity),
      position: PositionMapper.toDto(iie.position)
    }
  }

  public static toDomain(doc: IIncursionInstanceEntity): IncursionInstanceEntity {
    return new IncursionInstanceEntity(
      EntityMapper.toDomain(doc.entity),
      PositionMapper.toDomain(doc.position)
    )
  }
}

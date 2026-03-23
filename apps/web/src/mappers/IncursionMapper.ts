import type { IIncursionDto } from '@incursion/dto'
import Incursion from '@/datatypes/business/incursion/Incursion'
import IncursionRoomMapper from './IncursionRoomMapper'

export default class IncursionMapper {
  public static toDomain(dto: IIncursionDto) {
    return new Incursion(
      dto.incursionId,
      dto.name,
      dto.level,
      IncursionRoomMapper.toDomain(dto.currentRoom),
      dto.theme
    )
  }
}

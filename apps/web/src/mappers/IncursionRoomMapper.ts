import type { IIncursionRoomDto } from '@incursion/dto'
import IncursionRoom from '@/datatypes/business/incursion/IncursionRoom'
import IncursionInstanceEntityMapper from './IncursionInstanceEntityMapper'

export default class IncursionroomMapper {
  public static toDomain(dto: IIncursionRoomDto) {
    return new IncursionRoom(
      dto.type,
      dto.width,
      dto.height,
      dto.entities.map((e) => IncursionInstanceEntityMapper.toDomain(e))
    )
  }
}

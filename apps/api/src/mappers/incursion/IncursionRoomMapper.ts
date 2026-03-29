import type { IIncursionRoomDto } from '@incursion/dto'
import type IIncursionRoom from '../../models/interfaces/incursion/IIncursionRoom'
import IncursionRoom from '../../models/domain/incursion/IncursionRoom'
import IncursionInstanceEntityMapper from '../entity/IncursionInstanceEntityMapper'

export default class IncursionRoomMapper {
  public static toDomain(doc: IIncursionRoom) {
    return new IncursionRoom(
      doc.type,
      doc.width,
      doc.height,
      doc.entities.map((e) => IncursionInstanceEntityMapper.toDomain(e))
    )
  }

  public static toDb(incursionRoom: IncursionRoom): IIncursionRoom {
    return {
      type: incursionRoom.type,
      width: incursionRoom.width,
      height: incursionRoom.height,
      entities: incursionRoom.entities.map((e) => IncursionInstanceEntityMapper.toDb(e))
    }
  }

  public static toDto(incursionRoom: IncursionRoom): IIncursionRoomDto {
    return {
      type: incursionRoom.type,
      width: incursionRoom.width,
      height: incursionRoom.height,
      entities: incursionRoom.entities.map((e) => IncursionInstanceEntityMapper.toDto(e))
    }
  }
}

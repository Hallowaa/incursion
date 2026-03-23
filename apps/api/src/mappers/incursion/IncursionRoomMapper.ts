import type { IIncursionRoomDto } from '@incursion/dto'
import type IIncursionRoom from '../../models/interfaces/incursion/IIncursionRoom'
import IncursionRoom from '../../models/domain/incursion/IncursionRoom'
import EntityMapper from '../entity/EntityMapper'

export default class IncursionRoomMapper {
  public static toDomain(doc: IIncursionRoom) {
    return new IncursionRoom(
      doc.type,
      doc.entities.map((e) => EntityMapper.toDomain(e))
    )
  }

  public static toDb(incursionRoom: IncursionRoom): IIncursionRoom {
    return {
      type: incursionRoom.type,
      entities: [] // TODO: EntityMapper.toDb
    }
  }

  public static toDto(incursionRoom: IncursionRoom): IIncursionRoomDto {
    return {
      type: incursionRoom.type,
      entities: incursionRoom.entities.map((e) => EntityMapper.toDto(e))
    }
  }
}

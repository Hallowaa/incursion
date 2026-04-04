import type { IIncursionDto } from '@incursion/dto'
import type IIncursionInstance from '../../models/interfaces/incursion/IIncursionInstance'
import Incursion from '../../models/domain/incursion/Incursion'
import IncursionRoomMapper from './IncursionRoomMapper'

export default class IncursionMapper {
  public static toDomain(doc: IIncursionInstance) {
    return new Incursion(
      doc._id,
      doc.name,
      doc.level,
      doc.rooms.map((r) => IncursionRoomMapper.toDomain(r)),
      IncursionRoomMapper.toDomain(doc.currentRoom),
      doc.theme
    )
  }

  public static toDb(incursion: Incursion): IIncursionInstance {
    return {
      _id: incursion._id,
      name: incursion.name,
      level: incursion.level,
      rooms: incursion.rooms.map((r) => IncursionRoomMapper.toDb(r)),
      currentRoom: IncursionRoomMapper.toDb(incursion.currentRoom),
      theme: incursion.theme
    }
  }

  public static toDto(incursion: Incursion): IIncursionDto {
    return {
      _id: incursion._id.toString(),
      name: incursion.name,
      level: incursion.level,
      room: incursion.rooms.map((r) => IncursionRoomMapper.toDto(r)),
      currentRoom: IncursionRoomMapper.toDto(incursion.currentRoom),
      theme: incursion.theme
    }
  }
}

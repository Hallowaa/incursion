import type IIncursionInstance from '../../models/interfaces/incursion/IIncursionInstance'
import Incursion from '../../models/domain/incursion/Incursion'
import IncursionRoomMapper from './IncursionRoomMapper'

export default class IncursionMapper {
  public static toDomain(doc: IIncursionInstance) {
    return new Incursion(
      doc.incursionId,
      doc.name,
      doc.level,
      doc.rooms.map((r) => IncursionRoomMapper.toDomain(r)),
      IncursionRoomMapper.toDomain(doc.currentRoom),
      doc.theme
    )
  }

  public static toDb(incursion: Incursion): IIncursionInstance {
    return {
      incursionId: incursion.incursionId,
      name: incursion.name,
      level: incursion.level,
      rooms: incursion.rooms.map((r) => IncursionRoomMapper.toDb(r)),
      currentRoom: IncursionRoomMapper.toDb(incursion.currentRoom),
      theme: incursion.theme
    }
  }

  // TODO: make toDto
}

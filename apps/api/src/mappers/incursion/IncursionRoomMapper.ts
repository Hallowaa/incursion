import type IncursionRoom from '../../models/domain/incursion/IncursionRoom'
import type IIncursionRoom from '../../models/interfaces/incursion/IIncursionRoom'

export default class IncursionRoomMapper {
  public static toDb(incursionRoom: IncursionRoom): IIncursionRoom {
    return {
      type: incursionRoom.type,
      entities: []
    }
  }
}

import { Entity, IncursionRoomType } from "../../../barrel"
import IIncursionRoom from "../../interfaces/incursion/IIncursionRoom"

export default class IncursionRoom {
  type: IncursionRoomType
  entities: Entity[]

  public constructor(type: IncursionRoomType, entities: Entity[]) {
    this.type = type
    this.entities = structuredClone(entities)
  }

  public static toDb(incursionRoom: IncursionRoom): IIncursionRoom {
    return {
      type: incursionRoom.type,
      entities: [],
    }
  }
}

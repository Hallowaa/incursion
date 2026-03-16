import IIncursionRoom from "../../interfaces/incursion/IIncursionRoom"
import Entity from "../entity/Entity"
import { IncursionRoomType } from "../enums/IncursionRoomType"

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

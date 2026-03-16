import { IncursionRoomType } from "../../domain/enums/IncursionRoomType"

export default interface IIncursionRoomTemplate {
  type: IncursionRoomType
  weight: number
}

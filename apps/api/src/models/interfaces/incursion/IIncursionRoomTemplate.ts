import { IncursionRoomType } from "@incursion/dto/src/enums/IncursionRoomType"

export default interface IIncursionRoomTemplate {
  type: IncursionRoomType
  weight: number
}

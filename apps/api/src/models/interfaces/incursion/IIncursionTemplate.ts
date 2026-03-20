import { IncursionId } from "@incursion/dto/src/enums/IncursionId"
import { IncursionRoomType } from "@incursion/dto/src/enums/IncursionRoomType"
import { IncursionTheme } from "@incursion/dto/src/enums/IncursionTheme"

// Used for translating between doc and domain object
export default interface IIncursionTemplate {
  incursionId: IncursionId
  name: string
  theme: IncursionTheme
  minLevel: number
  maxLevel: number
  roomCountRange: number[]
  guaranteedRooms: IncursionRoomType[]
  possibleRooms: { type: IncursionRoomType; weight: number }[]
  adversaryTags: string[]
}

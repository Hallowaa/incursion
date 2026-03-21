import type { IncursionId, IncursionRoomType, IncursionTheme } from '@incursion/dto'

// Used for translating between doc and domain object
export default interface IIncursionTemplate {
  incursionId: IncursionId
  name: string
  theme: IncursionTheme
  minLevel: number
  maxLevel: number
  roomCountRange: number[]
  guaranteedRooms: IncursionRoomType[]
  possibleRooms: { type: IncursionRoomType, weight: number }[]
  adversaryTags: string[]
}

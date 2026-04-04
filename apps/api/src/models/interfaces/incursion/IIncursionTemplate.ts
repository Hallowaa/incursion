import type { IncursionName, IncursionRoomType, IncursionTheme } from '@incursion/dto'
import type mongoose from 'mongoose'

// Used for translating between doc and domain object
export default interface IIncursionTemplate {
  _id: mongoose.Types.ObjectId
  name: IncursionName
  theme: IncursionTheme
  minLevel: number
  maxLevel: number
  roomCountRange: number[]
  guaranteedRooms: IncursionRoomType[]
  possibleRooms: { type: IncursionRoomType, weight: number }[]
  adversaryTags: string[]
}

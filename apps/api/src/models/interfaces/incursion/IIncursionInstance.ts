import type { IncursionName, IncursionTheme } from '@incursion/dto'
import type mongoose from 'mongoose'
import type IIncursionRoom from './IIncursionRoom'

export default interface IIncursionInstance {
  _id: mongoose.Types.ObjectId
  name: IncursionName
  level: number
  rooms: IIncursionRoom[]
  currentRoom: IIncursionRoom
  theme: IncursionTheme
}

import type { IncursionName, IncursionTheme } from '@incursion/dto'
import type IIncursionRoom from './IIncursionRoom'

export default interface IIncursionInstance {
  incursionId: string
  name: IncursionName
  level: number
  rooms: IIncursionRoom[]
  currentRoom: IIncursionRoom
  theme: IncursionTheme
}

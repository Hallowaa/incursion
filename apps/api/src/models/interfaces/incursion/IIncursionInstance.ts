import type { IncursionId, IncursionTheme } from '@incursion/dto'
import type IIncursionRoom from './IIncursionRoom'

export default interface IIncursionInstance {
  incursionId: IncursionId
  name: string
  level: number
  rooms: IIncursionRoom[]
  currentRoom: IIncursionRoom
  theme: IncursionTheme
}

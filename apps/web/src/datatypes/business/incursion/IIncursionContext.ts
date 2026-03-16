import type IIncursionRoom from './IIncursionRoom'

export default interface IIncursionContext {
  name: string
  level: number
  currentRoom: IIncursionRoom
}

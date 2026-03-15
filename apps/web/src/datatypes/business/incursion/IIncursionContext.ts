import type { IIncursionRoom } from '@/barrel'

export default interface IIncursionContext {
  name: string
  level: number
  currentRoom: IIncursionRoom
}

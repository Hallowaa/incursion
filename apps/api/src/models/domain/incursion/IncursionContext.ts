import { IncursionRoom } from "../../../barrel"

export default interface IncursionContext {
  name: string
  level: number
  rooms: IncursionRoom[]
}

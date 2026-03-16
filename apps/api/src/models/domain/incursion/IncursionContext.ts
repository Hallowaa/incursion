import IncursionRoom from "./IncursionRoom"

export default interface IncursionContext {
  name: string
  level: number
  rooms: IncursionRoom[]
}

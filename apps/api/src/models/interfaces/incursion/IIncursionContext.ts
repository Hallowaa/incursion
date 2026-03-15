import { IIncursionRoom } from "../../../barrel"

export default interface IIncursionContext {
  name: string
  level: number
  rooms: IIncursionRoom[]
}

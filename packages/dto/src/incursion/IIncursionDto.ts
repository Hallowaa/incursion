import { IncursionName } from "../enums/IncursionName";
import { IncursionTheme } from "../enums/IncursionTheme";
import { IIncursionRoomDto } from "./IIncursionRoomDto";

export interface IIncursionDto {
  _id: string
  name: IncursionName
  level: number
  room: IIncursionRoomDto[]
  currentRoom: IIncursionRoomDto
  theme: IncursionTheme
}
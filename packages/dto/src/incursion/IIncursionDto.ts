import { IncursionId } from "../enums/IncursionId";
import { IncursionTheme } from "../enums/IncursionTheme";
import { IIncursionRoomDto } from "./IIncursionRoomDto";

export interface IIncursionDto {
  incursionId: IncursionId
  name: string
  level: number
  room: IIncursionRoomDto[]
  currentRoom: IIncursionRoomDto
  theme: IncursionTheme
}
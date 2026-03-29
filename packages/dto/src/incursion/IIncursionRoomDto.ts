import { IIncursionInstanceEntityDto } from "../entity/IIncursionInstanceEntityDto";
import { IncursionRoomType } from "../enums/IncursionRoomType";

export interface IIncursionRoomDto {
  type: IncursionRoomType
  width: number
  height: number
  entities: IIncursionInstanceEntityDto[]
}
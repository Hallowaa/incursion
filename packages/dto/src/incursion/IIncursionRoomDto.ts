import { IEntityDto } from "../entity/IEntityDto";
import { IncursionRoomType } from "../enums/IncursionRoomType";

export interface IIncursionRoomDto {
  type: IncursionRoomType
  entities: IEntityDto[]
}
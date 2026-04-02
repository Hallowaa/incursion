import { IEntityStatDto } from "../../entity/IEntityStatDto";
import { IDeltaDto } from "./IDeltaDto";

export interface IIIEStatDeltaDto extends IDeltaDto {
  stat: IEntityStatDto
}
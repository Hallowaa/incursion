import { IPositionDto } from "../incursion/IPositionDto";
import { ICharacterDto } from "./ICharacterDto";
import { IEntityDto } from "./IEntityDto";

export interface IIncursionInstanceEntityDto {
  entity: IEntityDto | ICharacterDto
  position: IPositionDto
}
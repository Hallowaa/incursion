import { IIncursionInstanceEntityDto } from "../../entity/IIncursionInstanceEntityDto";
import { DeltaType } from "../../enums/DeltaType";

export interface IDeltaDto {
  deltaType: DeltaType
  iie: IIncursionInstanceEntityDto
}
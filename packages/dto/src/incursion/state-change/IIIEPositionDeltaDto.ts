import { DeltaType } from "../../enums/DeltaType";
import { IPositionDto } from "../IPositionDto";
import { IDeltaDto } from "./IDeltaDto";

export interface IIIEPositionDeltaDto extends IDeltaDto {
  position: IPositionDto
}
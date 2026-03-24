import { IPositionDto } from "../incursion/IPositionDto"
import { IEntityStatDto } from "./IEntityStatDto"

export interface IEntityDto {
  entityId: string
  name: string
  stats: IEntityStatDto[]
  position: IPositionDto | undefined
}
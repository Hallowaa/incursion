import { IPositionDto } from "./IPositionDto"

export interface IActionContextDto {
  timestamp: number
  targetPosition: IPositionDto
}
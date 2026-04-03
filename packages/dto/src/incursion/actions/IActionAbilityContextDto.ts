import { AbilityId } from "../../enums/AbilityId";
import { IPositionDto } from "../IPositionDto";
import { IActionContextDto } from "./IActionContextDto";

export interface IActionAbilityContextDto extends IActionContextDto {
  userId: string
  abilityId: AbilityId
  targetPosition: IPositionDto
}
import { AbilityId } from "../enums/AbilityId";
import { AbilityResourceType } from "../enums/AbilityResourceType";
import { TargetType } from "../enums/TargetType";
import { IPositionDto } from "../incursion/IPositionDto";

export interface IAbilityDto {
  abilityId: AbilityId
  name: string
  description: string
  targetType: TargetType
  elapsed: number
  baseCooldown: number
  baseRange: number
  baseCastTime: number
  baseRadius: IPositionDto
  baseCost: number
  resourceType: AbilityResourceType 
}
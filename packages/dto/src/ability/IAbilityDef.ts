import { AbilityId } from "../enums/AbilityId"
import { AbilityResourceType } from "../enums/AbilityResourceType"
import { TargetType } from "../enums/TargetType"
import { IPositionDto } from "../incursion/IPositionDto"

export interface IAbilityDef {
  abilityId: AbilityId
  name: string
  description: string
  targetType: TargetType
  baseCooldown: number
  baseCastTime: number
  baseRange: number
  baseRadius: IPositionDto
  baseCost: number
  resourceType: AbilityResourceType
}
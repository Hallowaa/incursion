import type { AbilityId, AbilityResourceType, TargetType } from '@incursion/dto'
import type Position from '../incursion/Position'

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  description: string
  targetType: TargetType
  baseCooldown: number
  baseCastTime: number
  baseRange: number
  baseRadius: Position
  baseCost: number
  resourceType: AbilityResourceType
}

import type { AbilityId, AbilityResourceType, IActionAbilityContextDto, IDeltaDto, TargetType } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type Incursion from '../incursion/Incursion'
import type Position from '../incursion/Position'

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  description: string
  targetType: TargetType
  baseCastTime: number
  baseRange: number
  baseRadius: Position
  baseCooldown: number
  baseCost: number
  resourceType: AbilityResourceType
  effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto) => IDeltaDto | undefined
  condition: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionAbilityContextDto) => boolean
}

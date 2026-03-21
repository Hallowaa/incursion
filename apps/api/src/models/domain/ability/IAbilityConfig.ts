import type { AbilityId, TargetType } from '@incursion/dto'
import type Entity from '../entity/Entity'
import type IncursionContext from '../incursion/IncursionContext'

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  description: string
  cooldown: number
  targetType: TargetType
  effect: (user: Entity, context: IncursionContext) => void
  condition: (user: Entity, context: IncursionContext) => boolean
}

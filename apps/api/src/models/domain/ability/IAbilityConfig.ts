import type { AbilityId, TargetType } from '@incursion/dto'
import type Entity from '../entity/Entity'
import type Incursion from '../incursion/Incursion'

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  description: string
  cooldown: number
  targetType: TargetType
  effect: (user: Entity, context: Incursion) => void
  condition: (user: Entity, context: Incursion) => boolean
}

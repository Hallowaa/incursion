import { AbilityId, Entity, IncursionContext, TargetType } from "../../../barrel"

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  cooldown: number
  targetType: TargetType
  effect: (user: Entity, context: IncursionContext) => void
  condition: (user: Entity, context: IncursionContext) => boolean
}

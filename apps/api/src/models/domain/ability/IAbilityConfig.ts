import { AbilityId, TargetType } from "@incursion/dto"
import Entity from "../entity/Entity"
import IncursionContext from "../incursion/IncursionContext"


export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  cooldown: number
  targetType: TargetType
  effect: (user: Entity, context: IncursionContext) => void
  condition: (user: Entity, context: IncursionContext) => boolean
}

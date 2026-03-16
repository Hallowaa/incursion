import Entity from "../entity/Entity"
import { AbilityId } from "../enums/AbilityId"
import { TargetType } from "../enums/TargetType"
import IncursionContext from "../incursion/IncursionContext"


export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  cooldown: number
  targetType: TargetType
  effect: (user: Entity, context: IncursionContext) => void
  condition: (user: Entity, context: IncursionContext) => boolean
}

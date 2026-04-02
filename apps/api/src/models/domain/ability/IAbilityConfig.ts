import type { AbilityId, IActionContextDto, IDeltaDto, TargetType } from '@incursion/dto'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type Incursion from '../incursion/Incursion'

export default interface IAbilityConfig {
  abilityId: AbilityId
  name: string
  description: string
  targetType: TargetType
  cooldown: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => number
  effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => IDeltaDto | undefined
  condition: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto) => boolean
}

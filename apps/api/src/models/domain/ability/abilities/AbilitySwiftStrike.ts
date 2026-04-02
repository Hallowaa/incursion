import type { IActionContextDto, IDeltaDto } from '@incursion/dto'
import type IncursionInstanceEntity from '../../entity/IncursionInstanceEntity'
import type Incursion from '../../incursion/Incursion'
import type IAbilityConfig from '../IAbilityConfig'
import { AbilityId, TargetType } from '@incursion/dto'
import Ability from '../Ability'

export default class AbilitySwiftStrike extends Ability {
  public constructor() {
    const config: IAbilityConfig = {
      abilityId: AbilityId.SWIFT_STRIKE,
      name: 'SWIFT STRIKE',
      description: 'Something something idk',
      targetType: TargetType.OTHER,
      cooldown: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): number => {
        return 2000 // TODO: take stats into account
      },
      effect: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): IDeltaDto | undefined => {
        return undefined
      },
      condition: (user: IncursionInstanceEntity, incursion: Incursion, context: IActionContextDto): boolean => {
        return true
      }
    }

    super(config)
  }
}

import type Entity from '../../entity/Entity'
import type IncursionContext from '../../incursion/IncursionContext'
import type IAbilityConfig from '../IAbilityConfig'
import { AbilityId, TargetType } from '@incursion/dto'
import Ability from '../Ability'

export default class AbilitySwiftStrike extends Ability {
  public constructor() {
    const config: IAbilityConfig = {
      abilityId: AbilityId.SWIFT_STRIKE,
      name: 'SWIFT STRIKE',
      description: 'Something something idk',
      cooldown: 0,
      targetType: TargetType.SELF,
      effect: function (user: Entity, context: IncursionContext): void {
        throw new Error('Function not implemented.')
      },
      condition: function (user: Entity, context: IncursionContext): boolean {
        throw new Error('Function not implemented.')
      }
    }

    super(config)
  }
}

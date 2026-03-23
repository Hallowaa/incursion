import type Entity from '../../entity/Entity'
import type IAbilityConfig from '../IAbilityConfig'
import { AbilityId, TargetType } from '@incursion/dto'
import Ability from '../Ability'

export default class AbilityMove extends Ability {
  public constructor() {
    const config: IAbilityConfig = {
      abilityId: AbilityId.MOVE,
      name: 'MOVE',
      description: 'Move 1 unit up, down, left or right.',
      cooldown: 1,
      targetType: TargetType.SELF,
      effect: function (user: Entity, context: Incursion): void {
        throw new Error('Function not implemented.')
      },
      condition: function (user: Entity, context: Incursion): boolean {
        throw new Error('Function not implemented.')
      }
    }

    super(config)
  }
}

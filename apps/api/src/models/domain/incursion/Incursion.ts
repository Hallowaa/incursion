import type { IncursionId, IncursionTheme } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type Character from '../entity/Character'
import type Entity from '../entity/Entity'
import type IncursionRoom from './IncursionRoom'
import { EntityKind } from '@incursion/dto'

export default class Incursion {
  private queuedActions: {
    user: Entity
    action: Ability
  }[] = []

  public constructor(
    public incursionId: IncursionId,
    public name: string,
    public level: number,
    public rooms: IncursionRoom[],
    public currentRoom: IncursionRoom,
    public theme: IncursionTheme
  ) {}

  public tick(delta: number) {

  }

  public queueAction(user: Entity, action: Ability) {
    if (action.canUse(user, this)) {
      this.queuedActions.push({ user, action })
    } else {
      console.warn(`${user.entityId} tried to use ${action.abilityId} but can't use it.`)
    }
  }

  public processQueuedActions() {
    for (const qa of this.queuedActions) {
      qa.action.execute(qa.user, this)
    }
  }

  public processCooldowns(delta: number) {
    for (const iie of this.currentRoom.entities) {
      // reduce cooldown timer
      // TODO: add AbilityInstance to iie
    }
  }
}

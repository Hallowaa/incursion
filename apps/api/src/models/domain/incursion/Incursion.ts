import type { IActionContextDto, IDeltaDto, IncursionId, IncursionTheme } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import type IncursionRoom from './IncursionRoom'

export default class Incursion {
  public active = false
  private queuedActions: {
    user: IncursionInstanceEntity
    action: Ability
    contextSnapshot: IActionContextDto
  }[] = []

  public deltas: IDeltaDto[] = []

  public constructor(
    public incursionId: IncursionId,
    public name: string,
    public level: number,
    public rooms: IncursionRoom[],
    public currentRoom: IncursionRoom,
    public theme: IncursionTheme
  ) {}

  public tick(deltaTime: number) {
    if (!this.active) {
      return
    }

    this.processQueuedActions()
  }

  public queueAction(user: IncursionInstanceEntity, action: Ability, context: IActionContextDto) {
    if (action.canUse(user, this, context)) {
      const contextSnapshot = structuredClone(context)
      this.queuedActions.push({ user, action, contextSnapshot })
    } else {
      console.warn(`${user.entity.entityId} tried to use ${action.abilityId} but can't use it.`)
    }
  }

  public processQueuedActions() {
    for (const qa of this.queuedActions) {
      const delta = qa.action.execute(qa.user, this, qa.contextSnapshot)

      if (delta) {
        this.deltas.push(delta)
      }
    }
  }

  public processCooldowns(deltaTime: number) {
    for (const iie of this.currentRoom.entities) {
      // reduce cooldown timer
    }
  }
}

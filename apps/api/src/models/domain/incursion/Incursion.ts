import type { IActionContextDto, IDeltaDto, IncursionId, IncursionTheme } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import IncursionRoom from './IncursionRoom'

export default class Incursion {
  public active = false
  private lastState: Incursion | undefined
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
    public theme: IncursionTheme,
    private isClone?: boolean
  ) {
    // prevent loop
    if (!isClone) {
      this.lastState = Incursion.clone(this)
    }
  }

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

    this.queuedActions = []
  }

  private validateState() {
    // TODO: check against state from client to see if it is valid
  }

  public processCooldowns(deltaTime: number) {
    for (const iie of this.currentRoom.entities) {
      // reduce cooldown timer
    }
  }

  public static clone(incursion: Incursion): Incursion {
    return new Incursion(
      incursion.incursionId,
      incursion.name,
      incursion.level,
      incursion.rooms.map((r) => IncursionRoom.clone(r)),
      IncursionRoom.clone(incursion.currentRoom),
      incursion.theme,
      true
    )
  }
}

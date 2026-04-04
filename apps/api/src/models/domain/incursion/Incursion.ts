import type { IActionAbilityContextDto, IActionContextDto, IDeltaDto, IncursionName, IncursionTheme } from '@incursion/dto'
import type Ability from '../ability/Ability'
import type IncursionInstanceEntity from '../entity/IncursionInstanceEntity'
import { ActionType } from '@incursion/dto'
import Log from '../../../util/Log'
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
    public incursionId: string,
    public name: IncursionName,
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
    this.processCooldowns(deltaTime)
  }

  // TODO: if I ever have actions that aren't abilities, I'm screwed I think...
  public queueAction(user: IncursionInstanceEntity, action: Ability, context: IActionAbilityContextDto) {
    if (action.canUse(user, this, context)) {
      const contextSnapshot = structuredClone(context)
      this.queuedActions.push({ user, action, contextSnapshot })
    } else {
      Log.i(`${user.entity.entityId} tried to use ${action.props.abilityId} but can't use it.`)
    }
  }

  public processQueuedActions() {
    for (const qa of this.queuedActions) {
      switch (qa.contextSnapshot.actionType) {
        case ActionType.USE_ABILITY: {
          const abilityContextSnapshot = qa.contextSnapshot as IActionAbilityContextDto
          const delta = qa.action.execute(qa.user, this, abilityContextSnapshot)

          if (delta) {
            this.deltas.push(delta)
          }

          break
        }
      }
    }

    this.queuedActions = []
  }

  private validateState() {
    // TODO: check against state from client to see if it is valid
  }

  public processCooldowns(deltaTime: number) {
    for (const iie of this.currentRoom.entities) {
      for (const ability of iie.abilities()) {
        if (ability.elapsed > 0) {
          ability.elapsed -= deltaTime
        }
      }
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

  // TODO: do checkHash
}

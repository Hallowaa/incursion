// The character controller takes in input and binds it to character actions
// such as using abilities.

import type { IActionAbilityContextDto } from '@incursion/dto'
import type { Vector2 } from 'three'
import type Tile from '../game-objects/Tile'
import type InputEventContext from './InputEventContext'
import type CommunicationManager from '@/managers/CommunicationManager'
import { ActionType } from '@incursion/dto'
import NotificationManager from '@/managers/NotificationManager'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useIncursionStore } from '@/stores/IncursionStore'
import Grid from '../Grid'

// It then talks to the actions are immediately displayed.
export default class CharacterController {
  public selectionRange = 1
  public grid: Grid = new Grid(1, 1)
  public characterStore: ReturnType<typeof useCharacterStore>
  public incursionStore: ReturnType<typeof useIncursionStore>
  private lastTiles: Set<Tile> = new Set()

  public constructor(
    public communicationManager: CommunicationManager
  ) {
    this.characterStore = useCharacterStore()
    this.incursionStore = useIncursionStore()
  }

  public onPointerMove(ctx: InputEventContext) {
    if (ctx.tile) {
      const tiles = new Set(this.getTilesInRange(ctx.tile.coord))

      for (const tile of tiles) {
        if (!this.lastTiles.has(tile)) tile.setHover(true)
      }
      for (const tile of this.lastTiles) {
        if (!tiles.has(tile)) tile.setHover(false)
      }

      this.lastTiles = tiles
    } else {
      for (const tile of this.lastTiles) tile.setHover(false)
      this.lastTiles.clear()
    }
  }

  private getTilesInRange(pos: Vector2): Tile[] {
    const half = Math.floor(this.selectionRange / 2)
    const result: Tile[] = []

    for (let x = pos.x - half; x <= pos.x + half; x++) {
      for (let y = pos.y - half; y <= pos.y + half; y++) {
        if (x >= 0 && x < this.grid.width && y >= 0 && y < this.grid.height) {
          result.push(this.grid.tiles[x][y] as Tile)
        }
      }
    }

    return result
  }

  public onPointerDown(ctx: InputEventContext) {
    if (ctx.button === undefined ||
      !ctx.tile ||
      !this.characterStore.character ||
      !this.incursionStore.incursion) {
      return
    }

    const currentAbility = this.characterStore.currentAbility
    const iieChar = this.incursionStore.incursion.currentRoom.entities.find((iie) => iie.entity.entityId === this.characterStore.character!.entityId)

    if (!iieChar) {
      NotificationManager.error(`Could not find character inside incursion on pointer down`)
      return
    }

    if (currentAbility) {
      currentAbility.execute(iieChar, this.incursionStore.incursion, ctx)

      const abilityContextDto: IActionAbilityContextDto = {
        userId: iieChar.entity.entityId,
        abilityId: currentAbility.props.abilityId,
        targetPosition: ctx.tile.coord,
        timestamp: Date.now(),
        actionType: ActionType.USE_ABILITY
      }

      this.incursionStore.executeAbility(this.communicationManager, abilityContextDto)
    }
  }
}

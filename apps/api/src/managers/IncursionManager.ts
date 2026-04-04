import type mongoose from 'mongoose'
import type { Server } from 'socket.io'
import type Incursion from '../models/domain/incursion/Incursion'
import type CharacterManager from './CharacterManager'
import { EntityKind } from '@incursion/dto'
import Log from '../util/Log'

const TICK_RATE = 20
const TICK_INTERVAL = 1000 / TICK_RATE

export default class IncursionManager {
  private characterIncursionMap: Map<string, string> = new Map()
  private incursions: Map<string, Incursion> = new Map()
  private intervalId: ReturnType<typeof setInterval> | null = null
  private lastTime = Date.now()

  public constructor(
    public io: Server,
    public characterManager: CharacterManager
  ) {}

  public addIncursion(characterId: mongoose.Types.ObjectId, incursionId: mongoose.Types.ObjectId, incursion: Incursion) {
    Log.i(`Character ${characterId} is now in incurion ${incursionId}`)

    // fix for wrong character ref being used
    for (const iie of incursion.currentRoom.entities) {
      if (iie.entity.kind === EntityKind.CHARACTER) {
        const character = this.characterManager.get(iie.entity._id.toString())

        if (!character) {
          Log.e(`Could not find character ${iie.entity._id.toString()} when replacing reference on add incursion`)
          continue
        }

        iie.entity = character
      }
    }

    this.incursions.set(incursionId.toString(), incursion)
    this.characterIncursionMap.set(characterId.toString(), incursionId.toString())

    if (!this.intervalId) {
      this.start()
    }
  }

  public removeIncursion(id: mongoose.Types.ObjectId) {
    this.incursions.delete(id.toString())

    const charactersInIncursion = [...this.characterIncursionMap.entries()]
      .filter(([, incursionId]) => incursionId.toString() === id.toString())
      .map(([characterId]) => characterId)

    for (const entry of charactersInIncursion) {
      this.characterIncursionMap.delete(entry)
    }

    if (this.incursions.size === 0) {
      this.stop()
    }
  }

  public getIncursion(id: mongoose.Types.ObjectId | string): Incursion | undefined {
    return this.incursions.get(id.toString())
  }

  public getIncursionFromCharacterId(id: mongoose.Types.ObjectId): Incursion | undefined {
    const incursionId = this.characterIncursionMap.get(id.toString())

    if (!incursionId) {
      Log.e(`Failed to get incursion ID from ${id}`)
      return
    }

    return this.getIncursion(incursionId)
  }

  private start() {
    this.intervalId = setInterval(() => {
      const delta = Date.now() - this.lastTime

      this.tick(delta)
      this.lastTime = Date.now()
    }, TICK_INTERVAL)
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  private tick(delta: number) {
    for (const el of this.incursions) {
      const id = el[0]
      const incursion = el[1]

      if (!incursion.active) {
        continue
      }

      incursion.tick(delta)
      this.broadcastDeltas(id.toString(), incursion)
    }
  }

  public broadcastDeltas(id: string, incursion: Incursion) {
    this.io.to(id).emit('incursion:deltaUpdate', incursion.deltas)
  }
}

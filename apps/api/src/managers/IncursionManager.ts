import type { Server } from 'socket.io'
import type Incursion from '../models/domain/incursion/Incursion'

const TICK_RATE = 20
const TICK_INTERVAL = 1000 / TICK_RATE

export default class IncursionManager {
  private characterIncursionMap: Map<string, string> = new Map()
  private incursions: Map<string, Incursion> = new Map()
  private intervalId: ReturnType<typeof setInterval> | null = null
  private lastTime = Date.now()

  public constructor(
    public io: Server
  ) {}

  public addIncursion(characterId: string, incursionId: string, incursion: Incursion) {
    // eslint-disable-next-line no-console
    console.log(`Added incursion ${incursion.incursionId} to manager`)

    this.incursions.set(incursionId, incursion)
    this.characterIncursionMap.set(characterId, incursionId)

    if (!this.intervalId) {
      this.start()
    }
  }

  public removeIncursion(id: string) {
    this.incursions.delete(id)

    const charactersInIncursion = [...this.characterIncursionMap.entries()]
      .filter(([, incursionId]) => incursionId === id)
      .map(([characterId]) => characterId)

    for (const entry of charactersInIncursion) {
      this.characterIncursionMap.delete(entry[0])
    }

    if (this.incursions.size === 0) {
      this.stop()
    }
  }

  public getIncursion(id: string): Incursion | undefined {
    return this.incursions.get(id)
  }

  public getIncursionFromCharacterId(characterId: string): Incursion | undefined {
    const incursionId = this.characterIncursionMap.get(characterId)

    if (!incursionId) {
      console.error(`Failed to get incursion ID from ${characterId}`)
      return
    }

    return this.getIncursion(incursionId)
  }

  private start() {
    this.intervalId = setInterval(() => {
      const delta = Date.now() - this.lastTime

      this.tick(delta)
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
      this.broadcastDeltas(id, incursion)
    }
  }

  public broadcastDeltas(id: string, incursion: Incursion) {
    this.io.to(id).emit('incursion:deltaUpdate', incursion.deltas)
  }
}

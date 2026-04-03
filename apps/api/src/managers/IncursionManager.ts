import type { Server } from 'socket.io'
import type Incursion from '../models/domain/incursion/Incursion'

const TICK_RATE = 20
const TICK_INTERVAL = 1000 / TICK_RATE

export default class IncursionManager {
  private incursions: Map<string, Incursion> = new Map()
  private intervalId: ReturnType<typeof setInterval> | null = null
  private lastTime = Date.now()

  public constructor(
    public io: Server
  ) {}

  public addIncursion(id: string, incursion: Incursion) {
    console.log(`Added incursion ${incursion.incursionId} to manager`)
    this.incursions.set(id, incursion)

    if (!this.intervalId) {
      this.start()
    }
  }

  public removeIncursion(id: string) {
    this.incursions.delete(id)

    if (this.incursions.size === 0) {
      this.stop()
    }
  }

  public getIncursion(id: string): Incursion | undefined {
    return this.incursions.get(id)
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

import type Incursion from '../models/domain/incursion/Incursion'

const TICK_RATE = 20
const TICK_INTERVAL = 1000 / TICK_RATE

export default class IncursionManager {
  private incursions: Map<string, Incursion> = new Map()
  private intervalId: ReturnType<typeof setInterval> | null = null
  private lastTime = Date.now()

  public addIncursion(id: string, incursion: Incursion) {
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
    // TODO: implement tick logic for all active incursions
  }
}

import type BusListener from './BusListener'

export default class Bus {
  private listeners: BusListener<any>[] = []

  attach(listener: BusListener<any>): void {
    if (this.listeners.includes(listener)) {
      return
    }

    this.listeners.push(listener)
  }

  detach(listener: BusListener<any>): void {
    const index = this.listeners.indexOf(listener)
    if (index === -1) {
      return
    }

    this.listeners.splice(index, 1)
  }

  public notify(): void {
    for (const listener of this.listeners) {
      listener.update(this)
    }
  }
}

import type Bus from './Bus'

export default interface BusListener<T extends Bus> {
  update: (bus: T) => void
}

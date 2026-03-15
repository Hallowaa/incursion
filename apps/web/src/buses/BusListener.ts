import type { Bus } from '@/barrel'

export default interface BusListener<T extends Bus> {
  update: (bus: T) => void
}

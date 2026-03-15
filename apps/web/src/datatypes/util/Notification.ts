import type { NotificationType } from '@/barrel'

export default class Notification {
  public timestamp: number
  public constructor(
    public type: NotificationType,
    public message: string
  ) {
    this.timestamp = Date.now()
  }
}

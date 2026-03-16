import type { NotificationType } from './NotificationType'

export default class Notification {
  public timestamp: number
  public constructor(
    public type: NotificationType,
    public message: string
  ) {
    this.timestamp = Date.now()
  }
}

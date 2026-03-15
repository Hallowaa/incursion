import { ref } from 'vue'
import { Notification, NotificationType } from '@/barrel'

export default class NotificationManager {
  public static notifications = ref<Array<Notification>>([])
  public static notificationDuration = 5000

  public static info(message: string) {
    NotificationManager.addNotification(NotificationType.INFO, message)
    this.removeFirst()
  }

  public static error(message: string) {
    NotificationManager.addNotification(NotificationType.ERROR, message)
    this.removeFirst()
  }

  public static warn(message: string) {
    NotificationManager.addNotification(NotificationType.WARNING, message)
    this.removeFirst()
  }

  private static addNotification(type: NotificationType, message: string) {
    const notification = new Notification(type, message)
    NotificationManager.notifications.value.push(notification)
  }

  private static removeFirst() {
    setTimeout(() => {
      this.notifications.value.shift()
    }, NotificationManager.notificationDuration)
  }
}

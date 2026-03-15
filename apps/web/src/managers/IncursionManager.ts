import type { CommunicationManager, DataManager, Incursion } from '@/barrel'
import { ref } from 'vue'
import { NotificationManager } from '@/barrel'

export default class IncursionManager {
  public currentIncursion = ref<Incursion>()
  public constructor(
    public dataManager: DataManager,
    public communicationManager: CommunicationManager
  ) {}

  public async beginIncursion() {
    NotificationManager.info('Beginning incursion.')
    const result = await this.communicationManager.beginIncursion()

    if (!result.success) {
      NotificationManager.error('Could not begin incursion')
      return
    }

    this.currentIncursion.value = result.result

    return result
  }
}

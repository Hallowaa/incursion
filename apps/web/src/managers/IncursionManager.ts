import type CommunicationManager from './CommunicationManager'
import type DataManager from './DataManager'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import { ref } from 'vue'
import NotificationManager from './NotificationManager'

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

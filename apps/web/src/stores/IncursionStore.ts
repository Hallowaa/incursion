import type { IIncursionDto } from '@incursion/dto'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import type { Result } from '@/datatypes/util/Result'
import type CommunicationManager from '@/managers/CommunicationManager'
import { defineStore } from 'pinia'
import NotificationManager from '@/managers/NotificationManager'
import IncursionMapper from '@/mappers/IncursionMapper'

export const useIncursionStore = defineStore('incursion', {
  state: () => {
    return {
      incursion: undefined as Incursion | undefined
    }
  },

  actions: {
    async beginIncursion(comm: CommunicationManager): Promise<Result<Incursion, Error>> {
      try {
        const incursionData = await comm.socketEmit<IIncursionDto>('incursion:begin')

        if (!incursionData) {
          NotificationManager.error('Could not begin incursion. Incursion data missing.')
          return {
            success: false,
            error: new Error('Could not begin incursion, incursion data missing.')
          }
        }

        const result = IncursionMapper.toDomain(incursionData)
        this.incursion = result

        return {
          success: true,
          result
        }
      } catch (err) {
        return {
          success: false,
          error: err as Error
        }
      }
    }
  }
})

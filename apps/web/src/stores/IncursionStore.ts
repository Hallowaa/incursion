import type { IDeltaDto, IIIEPositionDeltaDto, IIIEStatDeltaDto, IIncursionDto } from '@incursion/dto'
import type Incursion from '@/datatypes/business/incursion/Incursion'
import type { Result } from '@/datatypes/util/Result'
import type CommunicationManager from '@/managers/CommunicationManager'
import type Renderer from '@/rendering/Renderer'
import { DeltaType } from '@incursion/dto'
import { defineStore } from 'pinia'
import NotificationManager from '@/managers/NotificationManager'
import EntityStatMapper from '@/mappers/EntityStatMapper'
import IncursionMapper from '@/mappers/IncursionMapper'

export const useIncursionStore = defineStore('incursion', {
  state: () => {
    return {
      isViewingIncursion: false,
      incursion: undefined as Incursion | undefined,
      renderer: undefined as Renderer | undefined
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
        this.isViewingIncursion = true

        await comm.socketEmit('incursion:startTicking')

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
    },

    registerIncursionHandlers(comm: CommunicationManager) {
      comm.onSocket('incursion:deltaUpdate', (data: IDeltaDto[]) => {
        if (!this.incursion) {
          NotificationManager.warn('Received delta update while no current incursion exists')
          return
        }

        for (const delta of data) {
          switch (delta.deltaType) {
            case DeltaType.STAT: {
              const statDelta = delta as IIIEStatDeltaDto
              // find entity and update it
              const iie = this.incursion.currentRoom.entities.find((e) => e.entity.entityId === delta.iie.entity.entityId)

              if (!iie) {
                NotificationManager.error(`Could not find entity ${statDelta.iie.entity.entityId} on stat delta.`)
                return
              }

              const stat = iie.entity.stats.find((s) => s.statId === statDelta.stat.statId)

              if (!stat) {
                NotificationManager.error(`Could not find stat ${statDelta.stat.statId} on stat delta.`)
                return
              }

              const statDomain = EntityStatMapper.toDomain(statDelta.stat)

              stat.baseValue = statDomain.baseValue
              stat.buffs = statDomain.buffs
              stat.currentValue = statDomain.currentValue
              break
            }
            case DeltaType.POSITION: {
              const posDelta = delta as IIIEPositionDeltaDto

              const iie = this.incursion.currentRoom.entities.find((e) => e.entity.entityId === delta.iie.entity.entityId)

              if (!iie) {
                NotificationManager.error(`Could not find entity ${posDelta.iie.entity.entityId} on stat delta.`)
                return
              }

              iie.position.x = posDelta.position.x
              iie.position.y = posDelta.position.y
            }
          }
        }
      })
    }
  }
})

import type { CharacterClassId, EntityStatId, ICharacterClassDto, ICharacterDto } from '@incursion/dto'
import type { Result } from '@/datatypes/util/Result'
import type CommunicationManager from '@/managers/CommunicationManager'
import { defineStore } from 'pinia'
import Character from '@/datatypes/business/entity/Character'
import NotificationManager from '@/managers/NotificationManager'

export const useCharacterStore = defineStore('character', {
  state: () => {
    return {
      character: undefined as Character | undefined,
      classAdvancements: undefined as ICharacterClassDto[] | undefined
    }
  },

  getters: {
    characterStatCurrentValue: (state) => {
      return (characterStat: EntityStatId) => state.character?.stats.find((s) => s.statId === characterStat)?.currentValue ?? -1
    }
  },

  actions: {
    async fetchCharacter(comm: CommunicationManager): Promise<Result<Character, Error>> {
      try {
        const characterData = await comm.socketEmit<ICharacterDto>('character:getCharacter')

        if (!characterData) {
          NotificationManager.error('Could not fetch character. Character not found.')
          return {
            success: false,
            error: new Error('No character found')
          }
        }

        const result = Character.toDomain(characterData)
        this.character = result

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

    async fetchClassAdvancements(comm: CommunicationManager): Promise<Result<ICharacterClassDto[], Error>> {
      try {
        const advancementsData = await comm.socketEmit<ICharacterClassDto[]>('character:getClassAdvancements')

        if (!advancementsData) {
          NotificationManager.error('Could not fetch class advancements.')
          return {
            success: false,
            error: new Error('Failed to get class advancements.')
          }
        }

        this.classAdvancements = advancementsData

        return {
          success: true,
          result: advancementsData
        }
      } catch (err) {
        return {
          success: false,
          error: err as Error
        }
      }
    },

    async chooseCharacterClass(comm: CommunicationManager, characterClassId: CharacterClassId): Promise<Result<boolean, Error>> {
      try {
        // TODO: update stats
        const response = await comm.socketEmit<boolean>('character:chooseClass', characterClassId)

        if (response == null) {
          NotificationManager.error('Failed to choose class.')
          return {
            success: false,
            error: new Error('Failed to choose class.')
          }
        }

        if (response === false) {
          NotificationManager.error('Unable to choose class.')
          return {
            success: false,
            error: new Error('Unable to choose class.')
          }
        }

        return {
          success: true,
          result: response
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

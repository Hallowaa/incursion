import type { CharacterClassId, EntityStatId, ICharacterClassDto, ICharacterDto, IEntityStatDto } from '@incursion/dto'
import type Character from '@/datatypes/business/entity/Character'
import type { Result } from '@/datatypes/util/Result'
import type CommunicationManager from '@/managers/CommunicationManager'
import { AbilityId } from '@incursion/dto'
import { defineStore } from 'pinia'
import NotificationManager from '@/managers/NotificationManager'
import CharacterClassMapper from '@/mappers/CharacterClassMapper'
import CharacterMapper from '@/mappers/CharacterMapper'
import EntityStatMapper from '@/mappers/EntityStatMapper'
import { useIncursionStore } from './IncursionStore'

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
    },
    currentAbility: (state) => {
      // for now just do move
      const move = state.character?.getAbilities().find((a) => a.props.abilityId === AbilityId.MOVE)

      return move
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

        const result = CharacterMapper.toDomain(characterData)
        this.character = result

        const incursionStore = useIncursionStore()
        incursionStore.incursion = this.character.currentIncursion

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
    },

    registerCharacterHandlers(comm: CommunicationManager) {
      comm.onSocket('character:statsUpdated', (data: IEntityStatDto[]) => {
        if (!this.character) {
          NotificationManager.warn('Received character stats update when no character exists.')
          return
        }
        this.character.stats = data.map((s) => EntityStatMapper.toDomain(s))
      })

      comm.onSocket('character:classUpdated', (data: ICharacterClassDto) => {
        if (!this.character) {
          NotificationManager.warn('Received character class update when no character exists.')
          return
        }
        this.character.classes.push(CharacterClassMapper.toDomain(data))
      })
    }
  }
})

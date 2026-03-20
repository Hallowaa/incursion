import type Character from '@/datatypes/business/entity/Character'
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', {
  state: () => {
    return {
      character: undefined as Character | undefined
    }
  }
})

import type Incursion from '@/datatypes/business/incursion/Incursion'
import { defineStore } from 'pinia'

export const useIncursionStore = defineStore('incursion', {
  state: () => {
    return {
      incursion: undefined as Incursion | undefined
    }
  }
})

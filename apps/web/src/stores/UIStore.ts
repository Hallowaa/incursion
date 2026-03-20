import type { PopUpType } from '@/enums/PopUpType'
import { defineStore } from 'pinia'

export const useUIStore = defineStore('ui', {
  state: () => {
    return {
      currentPopUp: undefined as PopUpType | undefined
    }
  },
  actions: {
    setCurrentPopUp(popUpType: PopUpType) {
      this.currentPopUp = popUpType
    },
    closeCurrentPopUp() {
      this.currentPopUp = undefined
    }
  }
})

<script lang="ts">
import type CommunicationManager from '@/managers/CommunicationManager'
import { mapState } from 'pinia'
import { defineComponent, inject } from 'vue'
import NotificationManager from '@/managers/NotificationManager'
import { useIncursionStore } from '@/stores/IncursionStore'
import { useUIStore } from '@/stores/UIStore'
import MainMenuButton from './util/button/MainMenuButton.vue'

export default defineComponent({
  name: 'MainMenu',

  components: {
    MainMenuButton
  },

  setup() {
    const uiStore = useUIStore()
    const incursionStore = useIncursionStore()
    const communicationManager = inject('communicationManager') as CommunicationManager

    return { uiStore, incursionStore, communicationManager }
  },

  computed: {
    ...mapState(useIncursionStore, {
      incursionText: (store) => store.incursion ? 'RESUME INCURSION' : 'BEGIN INCURSION'
    })
  },

  methods: {
    async beginIncursion() {
      if (this.incursionStore.incursion) {
        this.incursionStore.isViewingIncursion = true
        NotificationManager.info('Incursion exists, viewing incursion now.')
        return
      }
      NotificationManager.info('Beginning incursion.')
      const response = await this.incursionStore.beginIncursion(this.communicationManager)
      if (!response.success) {
        NotificationManager.error(`Could not begin incursion: ${response.error}`)
        return
      }

      this.incursionStore.incursion = response.result
    }
  }
})
</script>

<template>
  <div class="main-menu-container">
    <MainMenuButton :text="incursionText" @clicked="beginIncursion" />
    <MainMenuButton text="MARKET" />
    <MainMenuButton text="LEADERBOARDS" />
  </div>
</template>

<style scoped>
.main-menu-container {
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  gap: 20px;
}
</style>

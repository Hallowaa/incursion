<script lang="ts">
import type IncursionManager from '@/managers/IncursionManager'
import { defineComponent, inject } from 'vue'
import { useUIStore } from '@/stores/UIStore'
import MainMenuButton from './util/button/MainMenuButton.vue'

export default defineComponent({
  name: 'MainMenu',

  components: {
    MainMenuButton
  },

  setup() {
    const uiStore = useUIStore()

    return { uiStore }
  },

  data() {
    return {
      incursionManager: inject('incursionManager') as IncursionManager
    }
  },

  methods: {
    async beginIncursion() {
      await this.incursionManager.beginIncursion()
    }
  }
})
</script>

<template>
  <div class="main-menu-container">
    <MainMenuButton text="INCURSION" @clicked="beginIncursion" />
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

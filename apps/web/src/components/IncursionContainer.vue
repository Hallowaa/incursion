<script lang="ts">
import type Renderer from '@/rendering/Renderer'
import { defineComponent, inject } from 'vue'
import NotificationManager from '@/managers/NotificationManager'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useIncursionStore } from '@/stores/IncursionStore'

export default defineComponent({
  name: 'IncursionContainer',

  setup() {
    const characterStore = useCharacterStore()
    const incursionStore = useIncursionStore()
    const renderer = inject('renderer') as Renderer

    return { characterStore, incursionStore, renderer }
  },

  data() {
    return {
      onKeyDown: null as ((e: KeyboardEvent) => void) | null
    }
  },

  mounted() {
    const canvas = this.$refs.canvas as HTMLCanvasElement

    if (!canvas) {
      NotificationManager.error('Canvas element not found.')
      return
    }

    this.renderer.init(canvas)

    const incursion = this.incursionStore.incursion

    if (!incursion) {
      NotificationManager.error('No current incursion exists.')
      return
    }
    this.renderer.buildIncursionScene(incursion)
    this.renderer.startRendering()

    this.onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F3') {
        e.preventDefault()
        this.renderer.toggleDebugHelpers()
      }
    }
    window.addEventListener('keydown', this.onKeyDown)
  },

  unmounted() {
    if (this.onKeyDown) {
      window.removeEventListener('keydown', this.onKeyDown)
    }
  }
})
</script>

<template>
  <div class="incursion-container full">
    <canvas ref="canvas" class="canvas" />
  </div>
</template>

<style scoped>
.full {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}

.canvas:focus {
  outline: none;
}
</style>

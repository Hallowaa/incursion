<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PopUpBase',

  emits: ['close']
})
</script>

<template>
  <div class="popup-container" @click="$emit('close')">
    <div class="popup-content" @click.stop>
      <slot />
    </div>
  </div>
</template>

<style scoped>
.popup-container {
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--popup-backdrop-color);
  backdrop-filter: blur(2px);
}

.popup-content {
  max-height: 80%;
  max-width: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

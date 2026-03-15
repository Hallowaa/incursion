<script lang="ts">
import { defineComponent } from 'vue'
import HorizontalSeparator from '../util/HorizontalSeparator.vue'

export default defineComponent({
  components: {
    HorizontalSeparator
  },

  props: {
    text: String,
    isLast: { type: Boolean, default: false }
  }
})
</script>

<template>
  <div class="stat">
    <div class="stat-body">
      <div class="stat-name">
        {{ text }}
      </div>
      <div class="stat-value">
        <slot />
      </div>
    </div>
    <HorizontalSeparator :height="2" />
  </div>
</template>

<style scoped>
.stat {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.stat-body {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  cursor: pointer;
}
</style>

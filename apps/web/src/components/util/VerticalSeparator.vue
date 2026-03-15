<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VerticalSeparator',

  props: {
    height: {
      type: Number,
      default: 100
    }
  },

  computed: {
    heightString(): string {
      return `${this.height}%`
    }
  }
})
</script>

<template>
  <div class="separator-container">
    <div class="separator-up" />
    <div class="separator-center" />
    <div class="separator-down" />
  </div>
</template>

<style scoped>
.separator-container {
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.separator-center {
  width: 6px;
  height: v-bind(heightString);

  background-color: var(--secondary-color);
}

.separator-up {
  width: 0;
  height: 0;

  border-left: 3px solid transparent;
  border-bottom: 6px solid var(--secondary-color);
  border-right: 3px solid transparent;
}

.separator-down {
  width: 0;
  height: 0;

  border-left: 3px solid transparent;
  border-top: 6px solid var(--secondary-color);
  border-right: 3px solid transparent;
}
</style>

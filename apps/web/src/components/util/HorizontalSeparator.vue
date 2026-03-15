<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HorizontalSeparator',

  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 6
    }
  },

  computed: {
    widthString(): string {
      return `${this.width}%`
    },
    heightStringHalf(): string {
      return `${this.height / 2}px`
    },
    heightString(): string {
      return `${this.height}px`
    }
  }
})
</script>

<template>
  <div class="separator-container">
    <div class="separator-left" />
    <div class="separator-center" />
    <div class="separator-right" />
  </div>
</template>

<style scoped>
.separator-container {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.separator-center {
  height: v-bind(heightString);
  width: v-bind(widthString);

  background-color: var(--secondary-color);
}

.separator-left {
  width: 0;
  height: 0;

  border-top: v-bind(heightStringHalf) solid transparent;
  border-right: 6px solid var(--secondary-color);
  border-bottom: v-bind(heightStringHalf) solid transparent;
}

.separator-right {
  width: 0;
  height: 0;

  border-top: v-bind(heightStringHalf) solid transparent;
  border-left: 6px solid var(--secondary-color);
  border-bottom: v-bind(heightStringHalf) solid transparent;
}
</style>

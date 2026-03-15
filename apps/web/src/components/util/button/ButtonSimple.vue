<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonSimple',

  props: {
    text: String
  },

  emits: ['clicked'],
  methods: {
    clicked() {
      this.$emit('clicked')
    }
  }
})
</script>

<template>
  <div class="button-container" @click="clicked">
    <div class="button-text">
      {{ text }}
    </div>
    <div class="button-bottom" />
  </div>
</template>

<style scoped>
.button-container {
  height: 30px;
  width: 100%;
  font-size: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  cursor: pointer;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0.15s;
}

.button-text {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}

.button-container:hover {
  height: 35px;
  background-image: linear-gradient(to top, var(--secondary-color) 10%, transparent 30%);
}

.button-bottom {
  height: 3px;

  background-color: var(--secondary-color);
}
</style>

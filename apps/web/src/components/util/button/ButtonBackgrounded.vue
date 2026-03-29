<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ButtonBackgrounded',

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
  display: flex;
  background-color: var(--primary-color);
  border-radius: var(--border-radius-small);
  padding: 3px;
  cursor: pointer;
}
</style>

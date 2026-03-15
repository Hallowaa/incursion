<script lang="ts">
import { defineComponent } from 'vue'
import HorizontalSeparator from '../HorizontalSeparator.vue'

export default defineComponent({
  name: 'MainMenuButton',

  components: {
    HorizontalSeparator
  },

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
  <div class="main-menu-button" @click="clicked">
    <h2 class="button-text">
      {{ text }}
    </h2>
    <div class="button-bottom">
      <div class="button-bottom-spike-container">
        <div class="button-bottom-spike" />
      </div>
      <div class="button-bottom-line">
        <HorizontalSeparator />
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-menu-button {
  width: 180px;
  height: 160px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background-image: linear-gradient(to top, var(--primary-color) 10%, transparent 90%);
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0.15s;
  cursor: pointer;
}

.main-menu-button:hover {
  height: 180px
}

.button-bottom {
  width: calc(100% + 6px);
}

.button-bottom-spike-container {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-text {
  width: 120px;
  height: calc(100% - 6px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-bottom-spike {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 8px solid var(--secondary-color);
}
</style>

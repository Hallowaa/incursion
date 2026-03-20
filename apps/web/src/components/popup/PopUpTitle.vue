<script lang="ts">
import { defineComponent } from 'vue'
import HorizontalSeparator from '../util/HorizontalSeparator.vue'

export default defineComponent({
  name: 'PopUpTitle',

  components: {
    HorizontalSeparator
  },

  props: {
    text: String
  }
})
</script>

<template>
  <div class="pop-up-title-container">
    <h1 class="pop-up-title-text">
      {{ text }}
    </h1>
    <HorizontalSeparator :width="40" />
  </div>
</template>

<style scoped>
.pop-up-title-container {
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pop-up-title-text {
  display: flex;
  height: 100%;
  align-items: center;
  margin-left: 10px;
}
</style>

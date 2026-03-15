<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopBar'
})
</script>

<template>
  <div class="top-bar-container">
    <h1 class="title">
      // PROJECT INCURSION
    </h1>
  </div>
</template>

<style scoped>
.top-bar-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  background-image: linear-gradient(to right, var(--panel-background-color), transparent);
  padding-left: 10px;
}

.title {
  background: -webkit-linear-gradient(left, var(--text-color-primary), var(--secondary-color));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>

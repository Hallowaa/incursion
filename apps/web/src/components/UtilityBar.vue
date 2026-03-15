<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UtilityBar'
})
</script>

<template>
  <div class="utility-bar-container" />
</template>

<style scoped>
.utility-bar-container {
  height: 100%;
  width: 70px;

  display: flex;
  border-top: 1px solid var(--secondary-color);
  border-right: 1px solid var(--secondary-color);
  background-color: var(--panel-background-color);
}
</style>

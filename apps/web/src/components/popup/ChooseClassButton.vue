<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ChooseClassButton',

  props: {
    name: String
  },

  computed: {
    imageFile() {
      return `src/assets/images/classes/${this.name}.png`
    },
    upperName() {
      return this.name?.toLocaleUpperCase()
    }
  }
})
</script>

<template>
  <div class="choose-class-button-container">
    <div class="button-top">
      <h1 class="class-name">
        {{ upperName }}
      </h1>
    </div>
    <div class="button-center">
      <img :src="imageFile" class="class-image">
    </div>
    <div class="button-bottom" />
  </div>
</template>

<style scoped>
.choose-class-button-container {
  display: flex;
  flex: 1;

  max-width: 32%;
  height: 100%;
  flex-direction: column;
  border-radius: var(--border-radius-large);

  background-color: var(--background-color);
}

.class-image {
  width: 200px;
}

.button-top {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.button-center {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

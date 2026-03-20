<script lang="ts">
import { defineComponent } from 'vue'
import ChooseClassButton from './ChooseClassButton.vue'
import PopUpTitle from './PopUpTitle.vue'

export default defineComponent({
  name: 'PopUpChooseClass',

  components: {
    PopUpTitle,
    ChooseClassButton
  }
})
</script>

<template>
  <div class="popup-choose-class-container">
    <div class="popup-top">
      <PopUpTitle text="CHOOSE YOUR CLASS" />
    </div>
    <div class="popup-bottom">
      <ChooseClassButton name="rogue" />
      <ChooseClassButton name="warrior" />
      <ChooseClassButton name="mage" />
    </div>
  </div>
</template>

<style scoped>
.popup-choose-class-container {
  width: 60dvw;
  height: 70dvh;
  background-color: var(--panel-background-color);
  border-radius: var(--border-radius-large);
  border: 1px solid var(--secondary-color);
  display: flex;
  flex-direction: column;
}

.popup-top {
  height: 100px;
}

.popup-bottom {
  display: flex;
  flex: 1;
  overflow-y: hidden;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<template>
  <div class="inventory-container">
    <div class="inventory">
      <div class="inventory-top">
        <div class="inventory-title">
          INVENTORY
        </div>
        <div class="inventory-sections">
          <div class="inventory-section">
            <img src="../../assets/images/ui/sword.png" class="icon rotated">
          </div>
          <div class="inventory-section">
            <img src="../../assets/images/ui/shield.png" class="icon">
          </div>
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section" />
          <div class="inventory-section non-bordered" />
        </div>
      </div>
      <div class="inventory-bottom">
        <div class="items-container" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.inventory-container {
  width: 100%;
  height: 100%;
  min-height: 300px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.inventory {
  height: 100%;
  width: 100%;
  display: flex;

  border: 1px solid var(--secondary-color);
  background-color: var(--panel-background-color);
  border-radius: var(--border-radius-large);
}

.inventory-top {
  width: 100%;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  border-bottom: 1px solid var(--secondary-color);
}

.inventory-bottom {
  height: 100%;
}

.inventory-sections {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}

.inventory-section {
  height: 100%;
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  border-right: 1px solid var(--secondary-color);
  background-color: var(--background-color);
  cursor: pointer;
  transition: all 0.2s;
}

.inventory-section:hover {
  box-shadow: inset 0px 0px 10px var(--secondary-color);
}

.inventory-title {
  height: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;
  border-right: 1px solid var(--secondary-color);
}

.icon {
  width: 30px;
  height: 30px;
}

.rotated {
  rotate: 30deg;
}

.non-bordered {
  border: none !important;
  border-radius: 0 var(--border-radius-large) 0 0;
}
</style>

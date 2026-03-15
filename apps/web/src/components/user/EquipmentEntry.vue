<script lang="ts">
import { defineComponent } from 'vue'
import { Item } from '@/barrel'
import HorizontalSeparator from '../util/HorizontalSeparator.vue'

export default defineComponent({
  name: 'EquipmentEntry',

  components: {
    HorizontalSeparator
  },

  props: {
    slot: {
      type: Item,
      required: false
    },
    slotType: {
      type: String,
      required: true
    }
  },

  computed: {
    imageUrl(): string | undefined {
      return this.slot?.imageUrl
    }
  }
})
</script>

<template>
  <div class="equipment-entry">
    <div class="equipment-slot">
      <div class="equipment-image-container">
        <img v-if="imageUrl" :src="imageUrl" alt="Equipment Image" class="equipment-image">
        <div v-else class="equipment-image" />
      </div>
    </div>
    <div class="equipment-info">
      <div class="equipment-title">
        {{ slotType }}
      </div>
      <HorizontalSeparator :height="2" />
      <div class="equipment-name">
        {{ slot?.name ?? 'UNEQUIPPED' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.equipment-entry {
  display: flex;
  flex-direction: row;
  align-items: center;

  flex: 1;
  width: 100%;
}

.equipment-slot {
  width: 3rem;
  height: 3rem;

  border-radius: var(--border-radius-medium);

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: var(--background-color);
}

.equipment-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.equipment-info {
  width: 100%;
  display: flex;
  flex-direction: column;

  margin-left: 0.5rem;
}
</style>

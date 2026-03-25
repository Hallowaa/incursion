<script lang="ts">
import { EntityStatId } from '@incursion/dto'
import { defineComponent } from 'vue'
import HorizontalSeparator from '../util/HorizontalSeparator.vue'

export default defineComponent({
  components: {
    HorizontalSeparator
  },

  props: {
    text: String,
    isLast: { type: Boolean, default: false }
  },

  computed: {
    textColor() {
      switch (this.text) {
        case this.getStatName(EntityStatId.DEXTERITY): {
          return 'var(--dexterity-color)'
        }
        case this.getStatName(EntityStatId.STRENGTH): {
          return 'var(--strength-color)'
        }
        case this.getStatName(EntityStatId.INTELLIGENCE): {
          return 'var(--intelligence-color)'
        }
        default: {
          return 'var(--primary-text-color)'
        }
      }
    }
  },

  methods: {
    getStatName(stat: EntityStatId) {
      return stat.split('_')[1].toLocaleUpperCase()
    }
  }
})
</script>

<template>
  <div class="stat">
    <div class="stat-body">
      <strong class="stat-name">
        {{ text }}
      </strong>
      <strong class="stat-value">
        <slot />
      </strong>
    </div>
    <HorizontalSeparator v-if="!isLast" :height="2" />
  </div>
</template>

<style scoped>
.stat {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.stat-name {
  color: v-bind(textColor);
}

.stat-body {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
}

.stat-value {
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
}
</style>

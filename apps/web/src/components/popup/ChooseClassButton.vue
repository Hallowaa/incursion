<script lang="ts">
import type { EntityStatId, ICharacterClassDto } from '@incursion/dto'
import type { PropType } from 'vue'
import type CommunicationManager from '@/managers/CommunicationManager'
import { CharacterClassId } from '@incursion/dto'
import { mapState } from 'pinia'
import { defineComponent, inject } from 'vue'
import { useCharacterStore } from '@/stores/CharacterStore'
import CharacterStat from '../user/CharacterStat.vue'

export default defineComponent({
  name: 'ChooseClassButton',

  components: {
    CharacterStat
  },

  props: {
    characterClass: {
      type: Object as PropType<ICharacterClassDto>,
      required: true
    }
  },

  setup() {
    const characterStore = useCharacterStore()
    const comm = inject('communicationManager') as CommunicationManager

    return { characterStore, comm }
  },

  computed: {
    imageFile() {
      return `src/assets/images/classes/${this.characterClass?.name?.toLocaleLowerCase()}.png`
    },
    upperName() {
      return this.characterClass?.name?.toLocaleUpperCase()
    },
    borderColor() {
      switch (this.characterClass?.name) {
        case CharacterClassId.ROGUE: {
          return 'var(--dexterity-color)'
        }
        case CharacterClassId.WARRIOR: {
          return 'var(--strength-color)'
        }
        case CharacterClassId.MAGE: {
          return 'var(--intelligence-color)'
        }
        default: {
          return 'var(--primary-text-color)'
        }
      }
    },
    ...mapState(useCharacterStore, ['characterStatCurrentValue'])
  },
  methods: {
    getStatName(stat: EntityStatId) {
      return stat.substring(5).replaceAll('_', ' ').toLocaleUpperCase()
    },
    async chooseCharacterClass() {
      await this.characterStore.chooseCharacterClass(this.comm, this.characterClass.name)
    }
  }

})
</script>

<template>
  <div class="choose-class-button-container" @click="chooseCharacterClass()">
    <div class="button-top">
      <h1 class="class-name">
        {{ upperName }}
      </h1>
    </div>
    <div class="button-center">
      <img :src="imageFile" class="class-image">
    </div>
    <div class="button-bottom">
      <div class="class-description-container">
        <p class="class-description">
          "{{ characterClass?.description }}"
        </p>
      </div>
      <div class="stats-container">
        <CharacterStat v-for="(stat, index) of characterClass?.stats" :key="index" :text="getStatName(stat.statId)">
          <div class="current-value">
            {{ characterStatCurrentValue(stat.statId) }}
          </div>
          ➤
          <div class="next-value">
            {{ characterStatCurrentValue(stat.statId) + stat.baseValue }}
          </div>
        </CharacterStat>
      </div>
    </div>
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
  border: 2px solid v-bind(borderColor);
  background-color: var(--background-color);
  transition: box-shadow 0.1s ease;
}

.choose-class-button-container:hover {
  cursor: pointer;
  box-shadow:
    inset 0 1px 0 0 rgba(255, 255, 255, 0.15),
    inset 0 -1px 0 0 rgba(0, 0, 0, 0.1),
    inset 0 0 30px 0 rgba(255, 255, 255, 0.3);
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

.class-description-container {
  width: 100%;
  box-sizing: border-box;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.class-description {
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-secondary);
  font-style: italic;
  overflow-wrap: break-word;
  text-align: center;
}

.stats-container {
  width: auto;
  display: flex;
  flex-direction: column;
  margin: 20px;
  gap: 10px;
}
</style>

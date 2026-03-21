<script lang="ts">
import type CommunicationManager from '@/managers/CommunicationManager'
import { CharacterClassId } from '@incursion/dto'
import { mapState } from 'pinia'
import { defineComponent, inject } from 'vue'
import { PopUpType } from '@/enums/PopUpType'
import { useCharacterStore } from '@/stores/CharacterStore'
import { useUIStore } from '@/stores/UIStore'
import ButtonBackgrounded from '../util/button/ButtonBackgrounded.vue'
import CharacterStat from './CharacterStat.vue'
import EquipmentEntry from './EquipmentEntry.vue'

export default defineComponent({
  name: 'CharacterContainer',

  components: {
    EquipmentEntry,
    CharacterStat,
    ButtonBackgrounded
  },

  setup() {
    const uiStore = useUIStore()
    const characterStore = useCharacterStore()
    const communicationManager = inject('communicationManager') as CommunicationManager

    return { uiStore, characterStore, communicationManager }
  },

  computed: {
    ...mapState(useCharacterStore, {
      characterName: (store) => store.character?.name,
      characterClass: (store) => store.character?.classes[store.character.classes.length - 1],
      characterStats: (store) => store.character?.stats ?? [],
      isClassless: (store) => store.character?.classes.at(-1)?.name === CharacterClassId.CLASSLESS
    })
  },

  methods: {
    async openChooseClassPopUp() {
      this.characterStore.fetchClassAdvancements(this.communicationManager)
      this.uiStore.setCurrentPopUp(PopUpType.CHOOSE_CLASS)
    }
  }
})
</script>

<template>
  <div id="character-container">
    <div class="character-container-top">
      <div class="character-info-container">
        <div class="character-stats-container">
          <div class="stats-title-container">
            <h1 class="stats-title">
              STATS
            </h1>
          </div>
          <div class="stats">
            <CharacterStat text="NAME">
              {{ characterName ?? 'NOT LOADED' }}
            </CharacterStat>
            <CharacterStat text="CLASS">
              <div v-if="characterClass && !isClassless">
                {{ characterClass.name }}
              </div>
              <div v-else>
                <ButtonBackgrounded text="CHOOSE CLASS" @clicked="openChooseClassPopUp()" />
              </div>
            </CharacterStat>
            <CharacterStat v-for="(stat, index) in characterStats" :key="stat.statId" :text="stat.displayName" :is-last="index === characterStats.length - 1">
              {{ stat.currentValue }}
            </CharacterStat>
          </div>
        </div>
        <div class="character-equipment-container">
          <div class="equipment-title-container">
            <h1 class="equipment-title">
              EQUIPMENT
            </h1>
          </div>
          <div class="equipment">
            <EquipmentEntry slot-type="MAIN HAND" />
            <EquipmentEntry slot-type="OFF HAND" />
            <EquipmentEntry slot-type="HEAD" />
            <EquipmentEntry slot-type="NECKLACE" />
            <EquipmentEntry slot-type="BODY" />
            <EquipmentEntry slot-type="BELT" />
            <EquipmentEntry slot-type="GLOVES" />
            <EquipmentEntry slot-type="RING 1" />
            <EquipmentEntry slot-type="RING 2" />
            <EquipmentEntry slot-type="BOOTS" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#character-container {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
}

.character-container-top {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.character-info-container {
  width: 100%;
  height: 100%;
  display: flex;

  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius-large);
  background-color: var(--panel-background-color);
  margin: 20px;
}

.character-stats-container {
  height: 100%;
  width: 40%;

  border-right: 1px solid var(--secondary-color);
}

.equipment-title-container {
  height: 3rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: start;

  border-bottom: 1px solid var(--secondary-color);
}

.equipment-title {
  margin-left: 1rem;
}

.stats-title-container {
  height: 3rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: end;

  border-bottom: 1px solid var(--secondary-color);
}

.stats-title {
  margin-right: 1rem;
}

.character-equipment-container {
  height: 100%;
  width: 60%;

  display: flex;
  flex-direction: column;
}

.equipment {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 10px;

  padding: 10px;
  overflow-y: auto;
}

.equipment-entry {
  display: flex;

  flex: 1;
}

.character-container-footer {
  height: 3rem;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  background-image: radial-gradient(circle, var(--primary-color), transparent 80%);
}

.stats {
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
}
</style>

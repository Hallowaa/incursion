<script lang="ts">
import type CommunicationManager from '@/managers/CommunicationManager'
import type LocalStorageManager from '@/managers/LocalStorageManager'
import type Renderer from '@/rendering/Renderer'
import { mapState } from 'pinia'
import { defineComponent, inject } from 'vue'
import IncursionContainer from '@/components/IncursionContainer.vue'
import MainMenu from '@/components/MainMenu.vue'
import PopUpBase from '@/components/popup/PopUpBase.vue'
import PopUpChooseClass from '@/components/popup/PopUpChooseClass.vue'
import TopBar from '@/components/TopBar.vue'
import CharacterContainer from '@/components/user/CharacterContainer.vue'
import InventoryContainer from '@/components/user/InventoryContainer.vue'
import NotificationsContainer from '@/components/util/NotificationsContainer.vue'
import VerticalSeparator from '@/components/util/VerticalSeparator.vue'
import UtilityBar from '@/components/UtilityBar.vue'
import { PopUpType } from '@/enums/PopUpType'
import router from '@/router'
import { useIncursionStore } from '@/stores/IncursionStore'
import { useUIStore } from '@/stores/UIStore'
import { useUserStore } from '@/stores/UserStore'

export default defineComponent({
  name: 'DashboardView',

  components: {
    VerticalSeparator,
    CharacterContainer,
    InventoryContainer,
    UtilityBar,
    MainMenu,
    TopBar,
    NotificationsContainer,
    PopUpBase,
    PopUpChooseClass,
    IncursionContainer
  },

  setup() {
    const uiStore = useUIStore()
    const communicationManager = inject('communicationManager') as CommunicationManager
    const localStorageManager = inject('localStorageManager') as LocalStorageManager
    const renderer = inject('renderer') as Renderer

    return { uiStore, communicationManager, localStorageManager, renderer }
  },

  computed: {
    ...mapState(useUIStore, {
      isPopUpOpen: (store) => store.currentPopUp !== undefined,
      isPopupChooseClass: (store) => store.currentPopUp === PopUpType.CHOOSE_CLASS
    }),
    ...mapState(useIncursionStore, {
      isViewingIncursion: (store) => store.isViewingIncursion
    })
  },

  async mounted() {
    const accessToken = this.localStorageManager.getToken()

    if (accessToken) {
      this.communicationManager.accessToken = accessToken
      this.communicationManager.initSocket()

      const userStore = useUserStore()
      const result = await userStore.fetchUser(this.communicationManager)

      if (result.success === false) {
        this.routeToLogin()
      }
    }

    await this.renderer.load()
  },

  methods: {
    routeToLogin() {
      router.push('/')
    },
    closePopUp() {
      this.uiStore.closeCurrentPopUp()
    }
  }
})
</script>

<template>
  <div id="dashboard">
    <div class="dashboard-left">
      <div class="dashboard-left-top">
        <TopBar />
      </div>
      <div class="dashboard-left-bottom">
        <div class="utility-bar-container">
          <UtilityBar />
        </div>
        <div class="dashboard-left-bottom-center">
          <IncursionContainer v-if="isViewingIncursion" />
          <MainMenu v-else />
        </div>
      </div>
    </div>
    <VerticalSeparator :height="95" />
    <div class="dashboard-right">
      <div class="dashboard-right-top">
        <CharacterContainer />
      </div>
      <div class="dashboard-right-bottom">
        <InventoryContainer />
      </div>
    </div>
    <div class="notifications-container">
      <NotificationsContainer />
    </div>
  </div>
  <div v-if="isPopUpOpen" class="popup-container">
    <PopUpBase @close="closePopUp()">
      <PopUpChooseClass v-if="isPopupChooseClass" />
    </PopUpBase>
  </div>
</template>

<style scoped>
#dashboard {
  width: 100dvw;
  height: 100dvh;

  display: flex;
}

.dashboard-left {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70dvw;
  min-width: 600px;
}

.dashboard-left-top {
  height: 60px;
  display: flex;
}

.dashboard-left-bottom {
  display: flex;
  width: 100%;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

.dashboard-left-bottom-center {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(to right, var(--panel-background-color), transparent);
}

.dashboard-right {
  display: flex;
  width: 30dvw;
  height: 100%;
  min-width: 500px;
  flex-direction: column;
}

.dashboard-right-top {
  display: flex;
  flex: 6;

  padding: 10px;
  padding-bottom: 0;
}

.dashboard-right-bottom {
  display: flex;
  flex: 4;
  padding: 10px;
  padding-top: 0;
}

.notifications-container {
  width: 400px;
  max-width: 400px;
  max-height: 800px;
  z-index: 50;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 20px;
}

.popup-container {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  top: 0;
  left: 0;
  z-index: 50;
}
</style>

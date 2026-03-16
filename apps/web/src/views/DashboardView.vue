<script lang="ts">
import type User from '@/datatypes/business/User'
import type CommunicationManager from '@/managers/CommunicationManager'
import type DataManager from '@/managers/DataManager'
import type LocalStorageManager from '@/managers/LocalStorageManager'
import { defineComponent, inject } from 'vue'
import MainMenu from '@/components/MainMenu.vue'
import TopBar from '@/components/TopBar.vue'
import CharacterContainer from '@/components/user/CharacterContainer.vue'
import InventoryContainer from '@/components/user/InventoryContainer.vue'
import NotificationsContainer from '@/components/util/NotificationsContainer.vue'
import VerticalSeparator from '@/components/util/VerticalSeparator.vue'
import UtilityBar from '@/components/UtilityBar.vue'
import router from '@/router'

export default defineComponent({
  name: 'DashboardView',

  components: {
    VerticalSeparator,
    CharacterContainer,
    InventoryContainer,
    UtilityBar,
    MainMenu,
    TopBar,
    NotificationsContainer
  },

  data() {
    return {
      communicationManager: inject('communicationManager') as CommunicationManager,
      dataManager: inject('dataManager') as DataManager,
      localStorageManager: inject('localStorageManager') as LocalStorageManager
    }
  },

  computed: {
    user(): User | undefined {
      return this.dataManager.user
    }
  },

  async mounted() {
    /*
    if (!this.communicationManager.isAlive()) {
      this.routeToLogin()
    }
      */

    const accessToken = this.localStorageManager.getToken()

    if (accessToken) {
      this.communicationManager.accessToken = accessToken
      this.communicationManager.initSocket()
      const result = await this.communicationManager.fetchUser()

      if (result.success === false) {
        this.routeToLogin()
      }
    }
  },

  methods: {
    routeToLogin() {
      router.push('/')
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
        <UtilityBar />
        <MainMenu />
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
  width: 100%;
}

.dashboard-left-top {
  height: 60px;
  display: flex;
}

.dashboard-left-bottom {
  display: flex;
  width: 100%;
  height: 100%;
}

.dashboard-right {
  display: flex;
  min-width: 30dvw;
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
  height: 800px;
  max-width: 400px;
  max-height: 800px;
  z-index: 50;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;

  padding: 20px;
}
</style>

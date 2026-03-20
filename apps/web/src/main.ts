import type StoreContainer from './stores/StoreContainer'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import CommunicationManager from './managers/CommunicationManager'
import IncursionManager from './managers/IncursionManager'
import LocalStorageManager from './managers/LocalStorageManager'
import router from './router'
import { useCharacterStore } from './stores/CharacterStore'
import { useIncursionStore } from './stores/IncursionStore'
import { useUIStore } from './stores/UIStore'

const uri = '/api'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// STORES
const characterStore = useCharacterStore()
const incursionStore = useIncursionStore()
const uiStore = useUIStore()

const stores: StoreContainer = {
  characterStore,
  incursionStore,
  uiStore
}

// MANAGERS
const localStorageManager = new LocalStorageManager()
const communicationManager = new CommunicationManager(uri, localStorageManager, stores)
const incursionManager = new IncursionManager(communicationManager)

// PROVIDE

app.provide('communicationManager', communicationManager)
app.provide('localStorageManager', localStorageManager)
app.provide('incursionManager', incursionManager)

app.use(router)
app.mount('#app')

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import CommunicationManager from './managers/CommunicationManager'
import LocalStorageManager from './managers/LocalStorageManager'
import Renderer from './rendering/Renderer'
import router from './router'
import { useIncursionStore } from './stores/IncursionStore'

const uri = '/api'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// MANAGERS
const localStorageManager = new LocalStorageManager()
const communicationManager = new CommunicationManager(uri, localStorageManager)
const renderer = new Renderer()

// PROVIDE
app.provide('communicationManager', communicationManager)
app.provide('localStorageManager', localStorageManager)
app.provide('renderer', renderer)

const incursionStore = useIncursionStore()
incursionStore.renderer = renderer

app.use(router)
app.mount('#app')

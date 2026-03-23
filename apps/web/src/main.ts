import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'
import CommunicationManager from './managers/CommunicationManager'
import LocalStorageManager from './managers/LocalStorageManager'
import router from './router'

const uri = '/api'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

// MANAGERS
const localStorageManager = new LocalStorageManager()
const communicationManager = new CommunicationManager(uri, localStorageManager)

// PROVIDE
app.provide('communicationManager', communicationManager)
app.provide('localStorageManager', localStorageManager)

app.use(router)
app.mount('#app')

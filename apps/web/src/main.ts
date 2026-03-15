import { createApp } from 'vue'
import App from './App.vue'
import UserUpdateBus from './buses/UserUpdateBus'
import CommunicationManager from './managers/CommunicationManager'
import DataManager from './managers/DataManager'
import IncursionManager from './managers/IncursionManager'
import LocalStorageManager from './managers/LocalStorageManager'
import router from './router'

const uri = '/api'

// BUSES
const userUpdateBus = new UserUpdateBus()

// MANAGERS
const localStorageManager = new LocalStorageManager()
const communicationManager = new CommunicationManager(uri, localStorageManager)
const dataManager = new DataManager(communicationManager)
const incursionManager = new IncursionManager(dataManager, communicationManager)

// ASSIGNMENTS
communicationManager.userUpdateBus = userUpdateBus

// ATTACHMENTS
userUpdateBus.attach(dataManager)

// PROVIDE
const app = createApp(App)
app.provide('communicationManager', communicationManager)
app.provide('dataManager', dataManager)
app.provide('localStorageManager', localStorageManager)
app.provide('incursionManager', incursionManager)

app.use(router)
app.mount('#app')

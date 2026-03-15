<script lang="ts">
import type { CommunicationManager, LocalStorageManager } from '@/barrel'
import { defineComponent, inject } from 'vue'
import ButtonSimple from '@/components/util/button/ButtonSimple.vue'
import HorizontalSeparator from '@/components/util/HorizontalSeparator.vue'
import router from '@/router'

export default defineComponent({
  name: 'LoginView',

  components: {
    ButtonSimple,
    HorizontalSeparator
  },

  data() {
    return {
      communicationManager: inject('communicationManager') as CommunicationManager,
      localStorageManager: inject('localStorageManager') as LocalStorageManager,
      username: '',
      password: '',
      message: ''
    }
  },

  methods: {
    async login() {
      const result = await this.communicationManager.login(this.username, this.password)
      if (!result.success) {
        this.message = result.error.message
        return
      }
      this.localStorageManager.saveToken(result.result)
      this.routeToDashboard()
    },

    async register() {
      const result = await this.communicationManager.register(this.username, this.password)
      if (!result.success) {
        this.message = result.error.message
        return
      }
      this.message = 'Registration successful, you can now login'
    },

    routeToDashboard() {
      router.push('/dashboard')
    }
  }
})
</script>

<template>
  <main>
    <div id="login-container">
      <div id="login-container-top">
        <h1 id="title">
          PROJECT INCURSION
        </h1>
        <HorizontalSeparator />
      </div>
      <form id="login-form">
        <div id="login-form-content">
          <div class="input-group">
            <label for="username">USERNAME</label>
            <input id="username" v-model="username" type="text" name="username" class="input-field">
          </div>
          <div class="input-group">
            <label for="password">PASSWORD</label>
            <input id="password" v-model="password" type="password" name="password" class="input-field">
          </div>
          <div id="buttons-container">
            <ButtonSimple text="LOGIN" @clicked="login" />
            <ButtonSimple text="REGISTER" @clicked="register" />
          </div>
          <div id="message">
            {{ message }}
          </div>
        </div>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  width: 100dvw;
  height: 100dvh;

  display: flex;
  justify-content: center;
  align-items: center;
}

#message {
  height: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--secondary-color);
}

#login-container {
  min-width: 300px;
  width: 25%;

  display: flex;
  flex-direction: column;
  align-items: center;
}

#login-container-top {
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -3px;
  z-index: 50;
}

#title {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

#login-form {
  width: 100%;
  height: 400px;

  display: flex;
  flex-direction: column;

  background-image: linear-gradient(to bottom, var(--panel-background-color), transparent);
}

#login-form-content {
  display: flex;
  flex-direction: column;

  padding: 30px;
  gap: 10px;
}

.input-group {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  gap: 10px;
}

.input-field {
  height: 2rem;

  padding-left: 5px;

  background-color: var(--background-color);
  border: none;
  border-radius: var(--border-radius-small);
}

.input-field:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--secondary-color);
}

#buttons-container {
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  gap: 6px;
  margin-top: 30px;
}
</style>

<script lang="ts">
import type Notification from '@/datatypes/util/Notification'
import { defineComponent } from 'vue'
import { NotificationType } from '@/datatypes/util/NotificationType'
import NotificationManager from '@/managers/NotificationManager'

export default defineComponent({
  name: 'NotificationsContainer',
  computed: {
    notifications(): Notification[] {
      return NotificationManager.notifications.value
    }
  },
  methods: {
    isInfo(notification: Notification) {
      return notification.type === NotificationType.INFO
    },
    isError(notification: Notification) {
      return notification.type === NotificationType.ERROR
    },
    isWarning(notification: Notification) {
      return notification.type === NotificationType.WARNING
    }
  }
})
</script>

<template>
  <div class="notifications">
    <TransitionGroup name="notification-fade">
      <div v-for="notification in notifications.slice().reverse()" :key="notification.timestamp" class="notification">
        <div class="icon-container">
          <div v-if="isInfo(notification)" class="icon-container">
            <img src="../../assets/images/ui/info.png" class="icon">
            <div class="notif-type info">
              {{ notification.type }}
            </div>
          </div>
          <div v-if="isError(notification)" class="icon-container">
            <img src="../../assets/images/ui/error.png" class="icon">
            <div class="notif-type error">
              {{ notification.type }}
            </div>
          </div>
          <div v-if="isWarning(notification)" class="icon-container">
            <img src="../../assets/images/ui/warning.png" class="icon">
            <div class="notif-type warning">
              {{ notification.type }}
            </div>
          </div>
        </div>
        <div class="message">
          {{ notification.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notifications {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 10px;
  position: relative;
}

.notification {
  display: flex;
  align-items: center;
  background-color: var(--panel-background-color);
  padding: 20px;
  gap: 10px;
  border: 1px solid var(--secondary-color);
  border-radius: var(--border-radius-large);
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  padding-bottom: 5px;
  border-radius: var(--border-radius-medium);
}

.message {
  height: 100%;
  display: flex;
  align-items: center;
  word-break: break-all;
  overflow: hidden;
  border-left: 1px solid var(--secondary-color);
  padding-left: 10px;
}

.icon-container {
  display: flex;
  width: 70px;
  min-width: 70px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info {
  color: var(--notification-info);
}

.error {
  color: var(--notification-error);
}

.warning {
  color: var(--notification-warning);
}

.notification-fade-enter-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.notification-fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
  position: absolute;
  width: 100%;
}

.notification-fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.notification-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.notification-fade-move {
  transition: transform 0.4s ease;
}
</style>

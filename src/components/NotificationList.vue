<template>
  <div class="notifications-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification"
        :class="notification.type"
      >
        <span class="material-icons notification-icon">
          {{ getIcon(notification.type) }}
        </span>
        <span class="notification-message">{{ notification.message }}</span>
        <button class="close-button" @click="remove(notification.id)">
          <span class="material-icons">close</span>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()
const notifications = computed(() => notificationStore.notifications)

function getIcon(type: string) {
  switch (type) {
    case 'success':
      return 'check_circle'
    case 'error':
      return 'error'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    default:
      return 'info'
  }
}

function remove(id: string) {
  notificationStore.remove(id)
}
</script>

<style scoped>
.notifications-container {
  position: fixed;
  top: var(--space-lg);
  right: var(--space-lg);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  max-width: 400px;
  pointer-events: none;
}

.notification {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  background-color: white;
  box-shadow: var(--shadow-md);
  pointer-events: auto;
}

.notification.success {
  background-color: var(--success);
  color: white;
}

.notification.error {
  background-color: var(--danger);
  color: white;
}

.notification.warning {
  background-color: var(--warning);
  color: white;
}

.notification.info {
  background-color: var(--info);
  color: white;
}

.notification-message {
  flex: 1;
  font-size: 0.875rem;
}

.close-button {
  background: none;
  border: none;
  color: inherit;
  opacity: 0.8;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity var(--transition-fast);
}

.close-button:hover {
  opacity: 1;
}

/* Transition animations */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s ease;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> 
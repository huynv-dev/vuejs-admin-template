<template>
  <div class="notifications-list">
    <div v-if="notifications.length === 0" class="empty-state">
      <div class="empty-icon">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h8V5H4v14z"></path>
        </svg>
      </div>
      <h3 class="empty-title">No notifications</h3>
      <p class="empty-description">You don't have any notifications yet.</p>
    </div>
    
    <div v-else class="notifications-container">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-item"
        :class="{ 'unread': !notification.read }"
        @click="markAsRead(notification.id)"
      >
        <div class="notification-content">
          <div class="notification-header">
            <div class="notification-icon">
              <svg v-if="notification.type === 'info'" class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg v-else-if="notification.type === 'success'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <svg v-else-if="notification.type === 'warning'" class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
              <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
                         <span class="notification-time">{{ formatTime(notification.createdAt) }}</span>
          </div>
          <h4 class="notification-title">{{ notification.title }}</h4>
          <p class="notification-message">{{ notification.message }}</p>
        </div>
        <button 
          class="notification-close"
          @click.stop="removeNotification(notification.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notifications'

const notificationStore = useNotificationStore()

const notifications = computed(() => notificationStore.notifications)

const markAsRead = (id: string) => {
  notificationStore.markAsRead(id)
}

const removeNotification = (id: string) => {
  notificationStore.removeNotification(id)
}

const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  if (diff < 60000) return 'Just now'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return `${Math.floor(diff / 86400000)}d ago`
}
</script>

<style scoped>
.notifications-list {
  @apply max-h-96 overflow-y-auto;
}

.empty-state {
  @apply text-center py-8 px-4;
}

.empty-icon {
  @apply flex justify-center mb-4;
}

.empty-title {
  @apply text-lg font-semibold text-gray-900 mb-2;
}

.empty-description {
  @apply text-gray-600;
}

.notifications-container {
  @apply space-y-2;
}

.notification-item {
  @apply flex items-start justify-between p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors;
}

.notification-item.unread {
  @apply bg-blue-50 border-blue-200;
}

.notification-content {
  @apply flex-1;
}

.notification-header {
  @apply flex items-center justify-between mb-2;
}

.notification-icon {
  @apply flex items-center;
}

.notification-time {
  @apply text-xs text-gray-500;
}

.notification-title {
  @apply font-semibold text-gray-900 mb-1;
}

.notification-message {
  @apply text-sm text-gray-700;
}

.notification-close {
  @apply ml-4 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors;
}
</style> 
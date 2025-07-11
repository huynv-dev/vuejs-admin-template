import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  read: boolean
  createdAt: Date
}

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([])

  function addNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt'>) {
    notifications.value.unshift({
      ...notification,
      id: Date.now().toString(),
      read: false,
      createdAt: new Date()
    })
  }

  function removeNotification(id: string) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  function markAsRead(id: string) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => n.read = true)
  }

  function clearAll() {
    notifications.value = []
  }

  // Example notifications for testing
  if (import.meta.env.DEV) {
    addNotification({
      title: 'Welcome to Admin Panel',
      message: 'Get started by exploring the dashboard features.',
      type: 'info'
    })
    addNotification({
      title: 'New Article Published',
      message: 'Your article "Getting Started with Vue 3" has been published successfully.',
      type: 'success'
    })
    addNotification({
      title: 'System Update',
      message: 'The system will undergo maintenance in 2 hours.',
      type: 'warning'
    })
  }

  return {
    notifications,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll
  }
}) 
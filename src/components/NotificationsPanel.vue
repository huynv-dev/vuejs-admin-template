<template>
  <a-card class="notifications-panel" :bordered="false">
    <template #title>
      <div class="panel-header">
        <span>Notifications</span>
        <a-space>
          <a-button type="text" size="small" @click="markAllAsRead">
            Mark all as read
          </a-button>
          <a-button type="text" size="small" @click="clearAll">
            Clear all
          </a-button>
        </a-space>
      </div>
    </template>

    <a-tabs v-model:activeKey="activeTab">
      <a-tab-pane key="all" tab="All">
        <NotificationsList :notifications="notifications" />
      </a-tab-pane>
      <a-tab-pane key="unread" tab="Unread">
        <NotificationsList :notifications="unreadNotifications" />
      </a-tab-pane>
    </a-tabs>

    <template #actions>
      <router-link to="/dashboard/notifications" class="view-all">
        View all notifications
      </router-link>
    </template>
  </a-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useNotificationStore } from '@/store/notifications'
import NotificationsList from './NotificationsList.vue'

const props = defineProps<{
  notifications: Array<{
    id: string
    title: string
    message: string
    type: 'info' | 'success' | 'warning' | 'error'
    read: boolean
    createdAt: Date
  }>
}>()

const notificationStore = useNotificationStore()
const activeTab = ref('all')

const unreadNotifications = computed(() => 
  props.notifications.filter(n => !n.read)
)

const markAllAsRead = () => {
  notificationStore.markAllAsRead()
}

const clearAll = () => {
  notificationStore.clearAll()
}
</script>

<style scoped>
.notifications-panel {
  width: 360px;
  max-height: 480px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

:deep(.ant-tabs-content) {
  max-height: 320px;
  overflow-y: auto;
}

.view-all {
  display: block;
  text-align: center;
  padding: 8px;
  color: var(--primary);
  text-decoration: none;
}

.view-all:hover {
  background: var(--bg-hover);
}
</style> 
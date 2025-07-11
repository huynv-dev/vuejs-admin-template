<template>
  <div class="toast-container">
    <Transition
      v-for="toast in toasts"
      :key="toast.id"
      name="toast"
      appear
    >
      <div
        :class="[
          'toast',
          `toast-${toast.type}`
        ]"
      >
        <div class="toast-icon">
          <svg v-if="toast.type === 'success'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else-if="toast.type === 'error'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <svg v-else-if="toast.type === 'warning'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        
        <div class="toast-content">
          <div v-if="toast.title" class="toast-title">{{ toast.title }}</div>
          <div class="toast-message">{{ toast.message }}</div>
        </div>
        
        <button 
          class="toast-close"
          @click="removeToast(toast.id)"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationsStore } from '@/stores/notifications'

const notificationsStore = useNotificationsStore()

const toasts = computed(() => notificationsStore.toasts)

const removeToast = (id: string) => {
  notificationsStore.removeToast(id)
}
</script>

<style scoped>
.toast-container {
  @apply fixed top-4 right-4 z-50 space-y-2;
}

.toast {
  @apply flex items-start gap-3 max-w-sm p-4 rounded-lg shadow-lg border;
  @apply bg-white border-gray-200;
}

.toast-success {
  @apply border-green-200 bg-green-50;
}

.toast-error {
  @apply border-red-200 bg-red-50;
}

.toast-warning {
  @apply border-yellow-200 bg-yellow-50;
}

.toast-info {
  @apply border-blue-200 bg-blue-50;
}

.toast-icon {
  @apply flex-shrink-0 mt-0.5;
}

.toast-success .toast-icon {
  @apply text-green-600;
}

.toast-error .toast-icon {
  @apply text-red-600;
}

.toast-warning .toast-icon {
  @apply text-yellow-600;
}

.toast-info .toast-icon {
  @apply text-blue-600;
}

.toast-content {
  @apply flex-1 min-w-0;
}

.toast-title {
  @apply font-semibold text-gray-900 mb-1;
}

.toast-message {
  @apply text-sm text-gray-700;
}

.toast-close {
  @apply flex-shrink-0 p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors;
}

/* Toast animations */
.toast-enter-active {
  transition: all 0.3s ease-out;
}

.toast-leave-active {
  transition: all 0.3s ease-in;
}

.toast-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.toast-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style> 
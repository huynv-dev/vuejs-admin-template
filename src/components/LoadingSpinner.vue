<template>
  <div class="loading-spinner" :class="{ overlay: isOverlay, inline: !isOverlay }">
    <div class="spinner"></div>
    <span v-if="text" class="loading-text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text?: string
  isOverlay?: boolean
}>()
</script>

<style scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
}

.loading-spinner.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1000;
}

.loading-spinner.inline {
  padding: var(--space-md);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-light);
  border-radius: 50%;
  border-top-color: var(--primary);
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 
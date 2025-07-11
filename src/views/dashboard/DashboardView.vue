<template>
  <div class="dashboard-view">
    <div class="dashboard-header">
      <h1 class="dashboard-title">Dashboard Overview</h1>
      <p class="dashboard-subtitle">Welcome back! Here's what's happening with your admin panel.</p>
    </div>

    <!-- Stats Cards -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon articles">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Articles</div>
          <div class="stat-value">25</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon users">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Active Users</div>
          <div class="stat-value">142</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon views">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Views</div>
          <div class="stat-value">1,254</div>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon likes">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </div>
        <div class="stat-content">
          <div class="stat-label">Total Likes</div>
          <div class="stat-value">427</div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="content-grid">
      <!-- Recent Activity -->
      <div class="content-card activity-card">
        <div class="card-header">
          <h3 class="card-title">Recent Activity</h3>
        </div>
        <div class="card-content">
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p>New article "Getting Started with Vue 3" published</p>
                <span class="timeline-time">2 hours ago</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p>User John Doe registered</p>
                <span class="timeline-time">4 hours ago</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p>System update completed</p>
                <span class="timeline-time">1 day ago</span>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <p>Database backup successful</p>
                <span class="timeline-time">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="content-card actions-card">
        <div class="card-header">
          <h3 class="card-title">Quick Actions</h3>
        </div>
        <div class="card-content">
          <div class="actions-grid">
            <BaseButton
              variant="solid"
              color-scheme="primary"
              size="lg"
              full-width
              class="action-button"
            >
              <template #leftIcon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
              </template>
              Create New Article
            </BaseButton>

            <BaseButton
              variant="outline"
              color-scheme="gray"
              size="lg"
              full-width
              class="action-button"
            >
              <template #leftIcon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
                </svg>
              </template>
              Manage Users
            </BaseButton>

            <BaseButton
              variant="outline"
              color-scheme="gray"
              size="lg"
              full-width
              class="action-button"
            >
              <template #leftIcon>
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </template>
              View Settings
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseButton from '@/components/atoms/button/BaseButton.vue'
</script>

<style scoped>
.dashboard-view {
  @apply p-6 space-y-6;
}

.dashboard-header {
  @apply mb-8;
}

.dashboard-title {
  @apply text-3xl font-bold text-gray-900 mb-2;
}

.dashboard-subtitle {
  @apply text-gray-600;
}

/* Stats Grid */
.stats-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8;
}

.stat-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow;
}

.stat-icon {
  @apply inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4;
}

.stat-icon.articles {
  @apply bg-blue-50 text-blue-600;
}

.stat-icon.users {
  @apply bg-green-50 text-green-600;
}

.stat-icon.views {
  @apply bg-purple-50 text-purple-600;
}

.stat-icon.likes {
  @apply bg-pink-50 text-pink-600;
}

.stat-content {
  @apply space-y-1;
}

.stat-label {
  @apply text-sm font-medium text-gray-600;
}

.stat-value {
  @apply text-2xl font-bold text-gray-900;
}

/* Content Grid */
.content-grid {
  @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
}

.content-card {
  @apply bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden;
}

.activity-card {
  @apply lg:col-span-2;
}

.actions-card {
  @apply lg:col-span-1;
}

.card-header {
  @apply px-6 py-4 border-b border-gray-200;
}

.card-title {
  @apply text-lg font-semibold text-gray-900;
}

.card-content {
  @apply p-6;
}

/* Timeline */
.timeline {
  @apply space-y-4;
}

.timeline-item {
  @apply flex items-start space-x-3;
}

.timeline-dot {
  @apply w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0;
}

.timeline-content {
  @apply flex-1 min-w-0;
}

.timeline-content p {
  @apply text-sm text-gray-900 mb-1;
}

.timeline-time {
  @apply text-xs text-gray-500;
}

/* Actions */
.actions-grid {
  @apply space-y-3;
}

.action-button {
  @apply justify-start;
}
</style> 
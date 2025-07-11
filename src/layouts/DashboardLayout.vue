<template>
  <div class="dashboard-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': collapsed }">
      <div class="sidebar-header">
        <div class="logo">
          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
          </svg>
          <span v-if="!collapsed" class="logo-text">Admin</span>
        </div>
        <button @click="collapsed = !collapsed" class="collapse-btn">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div class="nav-section">
          <button 
            @click="navigateTo('dashboard')"
            :class="['nav-item', { active: $route.name === 'dashboard' }]"
          >
            <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
            <span v-if="!collapsed" class="nav-text">Dashboard</span>
          </button>

          <div class="nav-group">
            <div class="nav-group-title" v-if="!collapsed">Content</div>
            <button 
              @click="navigateTo('articles')"
              :class="['nav-item', { active: $route.name === 'articles' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">Articles</span>
            </button>

            <button 
              @click="navigateTo('categories')"
              :class="['nav-item', { active: $route.name === 'categories' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">Categories</span>
            </button>

            <button 
              @click="navigateTo('media')"
              :class="['nav-item', { active: $route.name === 'media' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">Media</span>
            </button>
          </div>

          <div class="nav-group">
            <div class="nav-group-title" v-if="!collapsed">Users</div>
            <button 
              @click="navigateTo('users')"
              :class="['nav-item', { active: $route.name === 'users' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">User List</span>
            </button>

            <button 
              @click="navigateTo('roles')"
              :class="['nav-item', { active: $route.name === 'roles' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">Roles</span>
            </button>
          </div>

          <div class="nav-group">
            <div class="nav-group-title" v-if="!collapsed">Settings</div>
            <button 
              @click="navigateTo('settings-general')"
              :class="['nav-item', { active: $route.name === 'settings-general' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">General</span>
            </button>

            <button 
              @click="navigateTo('settings-appearance')"
              :class="['nav-item', { active: $route.name === 'settings-appearance' }]"
            >
              <svg class="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path>
              </svg>
              <span v-if="!collapsed" class="nav-text">Appearance</span>
            </button>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <!-- Breadcrumb -->
          <nav class="breadcrumb">
            <span v-for="(item, index) in breadcrumbItems" :key="item.path" class="breadcrumb-item">
              <span v-if="index === breadcrumbItems.length - 1" class="breadcrumb-current">
                {{ item.name }}
              </span>
              <router-link v-else :to="item.path" class="breadcrumb-link">
                {{ item.name }}
              </router-link>
              <span v-if="index < breadcrumbItems.length - 1" class="breadcrumb-separator">/</span>
            </span>
          </nav>
        </div>

        <div class="header-right">
          <!-- Search -->
          <div class="search-box">
            <svg class="search-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input 
              v-model="searchQuery"
              type="text"
              placeholder="Search..."
              class="search-input"
            />
          </div>

          <!-- Theme Toggle -->
          <button 
            @click="toggleTheme"
            class="theme-toggle"
            :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          >
            <svg v-if="isDarkMode" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
            </svg>
          </button>

          <!-- Notifications -->
          <div class="notifications-dropdown">
            <button class="notifications-trigger" @click="showNotifications = !showNotifications">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h8V5H4v14z"></path>
              </svg>
              <span v-if="unreadCount > 0" class="notifications-badge">{{ unreadCount }}</span>
            </button>
            
            <div v-if="showNotifications" class="notifications-panel">
              <div class="notifications-header">
                <h3>Notifications</h3>
                <button @click="showNotifications = false" class="close-panel">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <NotificationsList />
            </div>
          </div>

          <!-- User Menu -->
          <div class="user-menu">
            <button class="user-trigger" @click="showUserMenu = !showUserMenu">
              <div class="user-avatar">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
              <span class="user-name">Admin User</span>
              <svg class="user-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>

            <div v-if="showUserMenu" class="user-panel">
              <div class="user-info">
                <div class="user-avatar-large">
                  <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <div>
                  <div class="user-name-large">Admin User</div>
                  <div class="user-email">admin@example.com</div>
                </div>
              </div>
              <div class="user-actions">
                <router-link to="/profile" class="user-action">Profile</router-link>
                <router-link to="/settings" class="user-action">Settings</router-link>
                <button @click="logout" class="user-action logout">Logout</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="page-content">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore } from '@/stores/theme'
import { useNotificationStore } from '@/stores/notifications'
import NotificationsList from '@/components/NotificationsList.vue'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const notificationStore = useNotificationStore()

const collapsed = ref(false)
const searchQuery = ref('')
const showNotifications = ref(false)
const showUserMenu = ref(false)

const isDarkMode = computed(() => themeStore.isDark)
const unreadCount = computed(() => notificationStore.notifications.filter(n => !n.read).length)

const breadcrumbItems = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const items = [{ name: 'Home', path: '/dashboard' }]
  
  let currentPath = ''
  pathSegments.forEach(segment => {
    currentPath += `/${segment}`
    if (segment !== 'dashboard') {
      items.push({
        name: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: currentPath
      })
    }
  })
  
  return items
})

const navigateTo = (routeName: string) => {
  router.push({ name: routeName })
}

const toggleTheme = () => {
  themeStore.toggleTheme()
}

const logout = () => {
  // Handle logout logic
  router.push('/auth/login')
}

// Close dropdowns when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as Element
    if (!target.closest('.notifications-dropdown')) {
      showNotifications.value = false
    }
    if (!target.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
.dashboard-layout {
  @apply flex h-screen bg-gray-50;
}

/* Sidebar */
.sidebar {
  @apply flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ease-in-out;
  width: 280px;
}

.sidebar-collapsed {
  width: 80px;
}

.sidebar-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.logo {
  @apply flex items-center space-x-3;
}

.logo-text {
  @apply text-xl font-bold text-gray-900;
}

.collapse-btn {
  @apply p-2 rounded-lg hover:bg-gray-100 transition-colors;
}

.sidebar-nav {
  @apply flex-1 p-4 space-y-6 overflow-y-auto;
}

.nav-section {
  @apply space-y-4;
}

.nav-group {
  @apply space-y-2;
}

.nav-group-title {
  @apply text-xs font-semibold text-gray-500 uppercase tracking-wider px-3;
}

.nav-item {
  @apply w-full flex items-center space-x-3 px-3 py-2 text-left text-gray-700 rounded-lg hover:bg-gray-100 transition-colors;
}

.nav-item.active {
  @apply bg-blue-50 text-blue-700;
}

.nav-icon {
  @apply w-5 h-5 flex-shrink-0;
}

.nav-text {
  @apply text-sm font-medium;
}

/* Main Content */
.main-content {
  @apply flex-1 flex flex-col overflow-hidden;
}

/* Header */
.header {
  @apply flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200;
}

.header-left {
  @apply flex items-center space-x-4;
}

.header-right {
  @apply flex items-center space-x-4;
}

/* Breadcrumb */
.breadcrumb {
  @apply flex items-center space-x-2 text-sm;
}

.breadcrumb-item {
  @apply flex items-center space-x-2;
}

.breadcrumb-link {
  @apply text-gray-500 hover:text-gray-700 transition-colors;
}

.breadcrumb-current {
  @apply text-gray-900 font-medium;
}

.breadcrumb-separator {
  @apply text-gray-400 mx-2;
}

/* Search */
.search-box {
  @apply relative;
}

.search-icon {
  @apply absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400;
}

.search-input {
  @apply pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  width: 320px;
}

/* Theme Toggle */
.theme-toggle {
  @apply p-2 rounded-lg hover:bg-gray-100 transition-colors;
}

/* Notifications */
.notifications-dropdown {
  @apply relative;
}

.notifications-trigger {
  @apply relative p-2 rounded-lg hover:bg-gray-100 transition-colors;
}

.notifications-badge {
  @apply absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center;
}

.notifications-panel {
  @apply absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50;
}

.notifications-header {
  @apply flex items-center justify-between p-4 border-b border-gray-200;
}

.notifications-header h3 {
  @apply text-lg font-semibold text-gray-900;
}

.close-panel {
  @apply p-1 rounded hover:bg-gray-100 transition-colors;
}

/* User Menu */
.user-menu {
  @apply relative;
}

.user-trigger {
  @apply flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors;
}

.user-avatar {
  @apply w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center;
}

.user-name {
  @apply text-sm font-medium text-gray-900;
}

.user-chevron {
  @apply w-4 h-4 text-gray-400;
}

.user-panel {
  @apply absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50;
}

.user-info {
  @apply flex items-center space-x-3 p-4 border-b border-gray-200;
}

.user-avatar-large {
  @apply w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center;
}

.user-name-large {
  @apply text-sm font-semibold text-gray-900;
}

.user-email {
  @apply text-xs text-gray-500;
}

.user-actions {
  @apply py-2;
}

.user-action {
  @apply block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors text-left;
}

.user-action.logout {
  @apply text-red-600 hover:bg-red-50;
}

/* Page Content */
.page-content {
  @apply flex-1 overflow-y-auto;
}
</style> 
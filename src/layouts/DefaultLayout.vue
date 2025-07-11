<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <router-link to="/" class="text-xl font-bold text-gray-900">
              Admin Dashboard
            </router-link>
          </div>
          <div class="flex items-center space-x-4">
            <router-link 
              to="/dashboard" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Dashboard
            </router-link>
            <router-link 
              to="/components-demo" 
              class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Components
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <main class="flex-1">
      <router-view />
    </main>

    <footer class="bg-white border-t border-gray-200">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} Admin Dashboard. Built with Vue 3 & Tailwind CSS.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// No script needed for this layout
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: var(--surface);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: var(--text-primary);
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-link:hover,
.nav-link.router-link-active {
  background-color: var(--background);
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  background-color: var(--surface);
  padding: 1rem;
  text-align: center;
  color: var(--text-secondary);
}

/* Transition animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
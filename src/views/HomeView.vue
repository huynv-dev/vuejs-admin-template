<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
        <p class="text-lg text-gray-600 mb-8">
          A modern admin interface built with Vue 3, TypeScript and Tailwind CSS.
        </p>
        <div class="space-y-4">
          <router-link 
            to="/dashboard" 
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            Go to Dashboard
          </router-link>
          <router-link 
            to="/components-demo" 
            class="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
          >
            View Components Demo
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script needed for this simple component
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 1rem 2rem;
  background-color: var(--primary);
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.cta-button:hover {
  background-color: var(--primary-hover);
}
</style> 
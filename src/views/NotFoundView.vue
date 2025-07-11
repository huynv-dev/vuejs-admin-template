<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <router-link to="/dashboard" class="back-button">
      Return to Dashboard
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NotFoundView'
});
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem;
  background-color: #f5f5f5;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #2c3e50;
}

h2 {
  font-size: 2rem;
  margin: 1rem 0;
  color: #2c3e50;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

.back-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #2c3e50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.back-button:hover {
  background-color: #1a2634;
}
</style> 
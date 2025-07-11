<script setup lang="ts">
</script>

<template>
  <router-view />
</template>

<style>
@import '@/assets/base.css';
body {
  margin: 0;
  background-color: #f5f5f5;
  min-height: 100vh;
}

#app {
  width: 100%;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #2196F3;
}
</style>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './views/AppHeader.vue'
</script>

<template>
  <div class="h-screen">
    <AppHeader />
    <RouterView />
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  text-align: center;
  margin-top: 2rem;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  color: white;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

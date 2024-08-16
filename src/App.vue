<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './views/AppHeader.vue'
import DropdownMenu from './views/DropdownMenu.vue'
import AppTabs from './views/AppTabs.vue'
import { useCookie } from './composables/cookies'
import { useRoute } from 'vue-router'

const { getCookies } = useCookie()

const route = useRoute()
</script>

<template>
  <div :class="{ wrapper: route.meta.isAuth }">
    <AppHeader v-if="!route.meta.isAuth && !getCookies('refreshToken')" />
    <DropdownMenu v-if="route.meta.isAuth" />
    <main class="h-screen">
      <header v-if="route.meta.isAuth">
        <AppTabs />
      </header>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template: 1fr / max-content 1fr;
}
</style>

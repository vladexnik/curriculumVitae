<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './views/AppHeader.vue'
import DropdownMenu from './views/DropdownMenu.vue'
import { useCookie } from './composables/cookies'
import { useRoute } from 'vue-router'
import { useThemeStore } from './stores/theme'
import { useLangStore } from './stores/lang'
import ProfileUserTabs from './views/users/id/ProfileUserTabs.vue'
import BreadcrumbsUser from './views/BreadcrumbsUser.vue'
import { onBeforeMount } from 'vue'
import { useUserStore } from './stores/user'

const { getCookies, setCookies } = useCookie()

const route = useRoute()
const themeStore = useThemeStore()
const langStore = useLangStore()
const refreshToken = getCookies('refreshToken')

themeStore.$subscribe((mutation, state) => {
  themeStore.selectedTheme = state.selectedTheme
})
langStore.$subscribe((mutation, state) => {
  langStore.selectedLang = state.selectedLang
})

onBeforeMount(async () => {
  useUserStore().initializeAuth()
})
</script>

<template>
  <div :class="{ wrapper: route.meta.isAuth }">
    <AppHeader v-if="!route.meta.isAuth && !refreshToken" />
    <DropdownMenu v-if="route.meta.isAuth" />
    <main class="h-screen px-6">
      <header class="pl-5 pt-4" v-if="route.meta.isAuth">
        <BreadcrumbsUser v-if="route.meta.breadcrumb" />
        <ProfileUserTabs v-if="route.meta.hasTabs" />
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

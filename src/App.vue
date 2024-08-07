<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './views/AppHeader.vue'
import DropdownMenu from './views/DropdownMenu.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { onMounted, watchEffect } from 'vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.initializeAuth()
})

const { accessToken } = storeToRefs(userStore)

watchEffect(() => {
  console.log(accessToken)
})
</script>

<template>
  <div class="h-screen" :class="{ wrapper: accessToken }">
    <AppHeader v-if="!accessToken" />
    <DropdownMenu v-if="accessToken" />
    <RouterView />
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

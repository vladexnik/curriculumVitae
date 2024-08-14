<template>
  <div class="about">
    <h1>Users List</h1>
    <button
      class="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
      @click="signOut"
    >
      Log out
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { logout } = userStore
const router = useRouter()

const signOut = () => {
  logout()
  router.push({ path: '/auth/login' })
}
</script>
<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>

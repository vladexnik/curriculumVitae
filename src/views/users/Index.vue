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
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { accessToken } = storeToRefs(userStore)
const { logout } = userStore
const router = useRouter()
const route = useRoute()

const signOut = () => {
  logout()
  router.push({ path: '/auth/login' })
}

onMounted(() => {
  const id = route.params.idc
  console.log('accessToken ', accessToken.value)
})
</script>

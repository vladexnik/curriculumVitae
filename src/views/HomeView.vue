<script setup lang="ts">
import ComponentsUsage from '../components/ComponentsUsage.vue'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui-kit/Button.vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const Logout = () => {
  userStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <main>
    <Button
      class="my-5 w-40"
      variant="outlined"
      color="secondary"
      @click="Logout"
      >Logout</Button
    >
    <ComponentsUsage />
  </main>
</template>

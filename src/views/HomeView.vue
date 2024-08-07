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
  <div class="wrappera">
    <section class="main h-full bg-bgColor px-6">
      <Button
        class="my-5 mr-5 w-40"
        variant="outlined"
        color="secondary"
        @click="Logout"
        >Logout</Button
      >
    </section>
  </div>
</template>
<style scoped></style>
<!-- grid-template-rows: 1fr;
  grid-template-columns: max-content 1fr;
  grid-template-areas: 'navigation page'; -->

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui-kit/Button.vue'

const userStore = useUserStore()

const Logout = () => {
  userStore.logout()
}
</script>

<template>
  <section class="main h-full bg-bgColor px-6">
    <Button
      class="my-5 mr-5 w-40"
      variant="outlined"
      color="secondary"
      @click="Logout"
      >Logout</Button
    >
  </section>
</template>
<style scoped></style>

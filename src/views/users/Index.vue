<template>
  <div class="about">
    <h1>Users List</h1>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const router = useRouter()
</script>
<style scoped>
.about {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>

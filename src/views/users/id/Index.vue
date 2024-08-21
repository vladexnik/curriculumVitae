<template>
  <div class="about">
    <h1>Profile of user</h1>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()

const userData = computed(() => userStore.authedUser?.user)
const userId = ref(userData.value?.id)
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup lang="ts">
import TabsAuth from './auth/TabsAuth.vue'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { authedUser } = storeToRefs(userStore)
</script>

<template>
  <TabsAuth v-if="!authedUser" />
</template>

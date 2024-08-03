<template>
  <Tabs :tabsAuth="tabsAuth" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../../components/ui-kit/Tabs.vue'
import type { TabsAuthT } from '@/models/models'


const tabsAuth = ref<TabsAuthT[]>([
  { label: 'Login', route: '/auth/login' },
  { label: 'Sign Up', route: '/auth/signup' }
])
</script>

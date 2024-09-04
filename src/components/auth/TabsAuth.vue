<template>
  <Tabs :tabs="tabs" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Tabs from '../ui-kit/Tabs.vue'
import type { TabsAuthT } from '@/models/models'

const tabs = ref<TabsAuthT[]>([
  { label: 'Login', route: '/auth/login' },
  { label: 'Sign Up', route: '/auth/signup' }
])
</script>

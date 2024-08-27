<template>
  <Tabs class="flex justify-start pt-2" :tabsAuth="tabsUser" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tabs from '@/components/ui-kit/Tabs.vue'
import type { TabsAuthT } from '@/models/models'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentUserId = computed(() => route.params.id)

const tabsUser = computed<TabsAuthT[]>(() => [
  { label: 'Profile', route: `/users/${currentUserId.value}` },
  { label: 'Skills', route: `/users/${currentUserId.value}/skills` },
  { label: 'Languages', route: `/users/${currentUserId.value}/languages` },
  { label: 'CVs', route: `/users/${currentUserId.value}/cvs` }
])
</script>

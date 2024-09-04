<template>
  <Tabs class="flex justify-start pt-2" :tabs="computedTabs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tabs from '@/components/ui-kit/Tabs.vue'
import type { TabsAuthT } from '@/models/models'
import { useRoute } from 'vue-router'

const route = useRoute()

const currentUserId = computed(() => route.params.id)
const currentCVId = computed(() => route.params.id)

const tabsUser = computed<TabsAuthT[]>(() => [
  { label: 'Profile', route: `/users/${currentUserId.value}` },
  { label: 'Skills', route: `/users/${currentUserId.value}/skills` },
  { label: 'Languages', route: `/users/${currentUserId.value}/languages` },
  { label: 'CVs', route: `/users/${currentUserId.value}/cvs` }
])

const tabsCvs = computed<TabsAuthT[]>(() => [
  { label: 'Details', route: `/cvs/${currentCVId.value}` },
  { label: 'Skills', route: `/cvs/${currentCVId.value}/skills` },
  { label: 'Projects', route: `/cvs/${currentCVId.value}/projects` },
  { label: 'Preview', route: `/cvs/${currentCVId.value}/preview` }
])

const computedTabs = computed(() => {
  if (route.path.includes('/users')) {
    return tabsUser.value
  } else if (route.path.includes('/cvs')) {
    return tabsCvs.value
  }
  return []
})
</script>

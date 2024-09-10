<template>
  <Tabs class="flex justify-start pt-2" :tabs="computedTabs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Tabs from '@/components/ui-kit/Tabs.vue'
import type { TabsAuthT } from '@/models/models'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const route = useRoute()

const currentUserId = computed(() => route.params.id)
const currentCVId = computed(() => route.params.id)

const tabsUser = computed<TabsAuthT[]>(() => [
  { label: t('profile'), route: `/users/${currentUserId.value}` },
  { label: t('skills'), route: `/users/${currentUserId.value}/skills` },
  { label: t('languages'), route: `/users/${currentUserId.value}/languages` },
  { label: t('cvs'), route: `/users/${currentUserId.value}/cvs` }
])

const tabsCvs = computed<TabsAuthT[]>(() => [
  { label: t('details'), route: `/cvs/${currentCVId.value}` },
  { label: t('skills'), route: `/cvs/${currentCVId.value}/skills` },
  { label: t('projects'), route: `/cvs/${currentCVId.value}/projects` },
  { label: t('preview'), route: `/cvs/${currentCVId.value}/preview` }
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

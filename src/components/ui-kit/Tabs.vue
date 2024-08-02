<template>
  <div class="card">
    <Tabs :value="activeTab" @update:value="changeTab">
      <TabList>
        <Tab
          v-for="tab in tabsAuth"
          :key="tab.label"
          :value="tab.route"
          @click.prevent="router.push(tab.route)"
        >
          <router-link
            v-if="tab.route"
            v-slot="{ href, navigate }"
            :to="tab.route"
            custom
          >
            <a
              :href="href"
              @click="navigate"
              class="flex items-center gap-2 text-inherit"
            >
              <p>{{ tab.label }}</p>
            </a>
          </router-link>
        </Tab>
      </TabList>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import type { TabsAuthT } from '@/models/models'

const route = useRoute()
const router = useRouter()
const activeTab = ref<string>(route.path)

defineProps<{
  tabsAuth: TabsAuthT[]
}>()

const changeTab = () => {
  router.push(activeTab.value)
}

watch(route, (newRoute) => {
  activeTab.value = newRoute.path
})
</script>
<style scoped>
:deep(.p-tab) {
  @apply border-none px-4 py-3 text-sm font-semibold uppercase active:bg-primaryLightActive active:hover:bg-primaryLightActive;
}

:deep(.p-tab .p-ink) {
  @apply bg-primaryLightActive;
}

:deep(.p-tablist-tab-list) {
  @apply justify-center border-none bg-transparent;
}

:deep(.p-tab:not(.p-tab-active)) {
  @apply active:hover:bg-lightGrey;
}

:deep(.p-tab p) {
  @apply flex h-6 w-28 items-center justify-center text-textMain;
}

:deep(.p-tab.p-tab-active p) {
  @apply text-primary;
}
</style>

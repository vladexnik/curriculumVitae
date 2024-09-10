<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3">
      <SearchInput v-model="search" />
    </div>
    <Table :tableData="data" :columns="columnsConfig" />
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length">
      <template #default>
        <h2 class="text-2xl font-semibold mb-2">{{ $t('customNoResultsTitle') }}</h2>
        <p class="text-gray-500 mb-4">{{ $t('customNoResultsDescription') }}</p>
      </template>
    </NoFound>
  </div>
</template>
<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import { storeToRefs } from 'pinia';
import { useProjectsListStore } from '@/stores/projects'; 
import { ref, watchEffect, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const projectsStore = useProjectsListStore()
const { projects } = storeToRefs(projectsStore)

interface DataRow {
    id: string,
    name: string,
    domain: string,
    startDate: string,
    endDate: string,
    description: string,
    environment: string[],
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: t('projectName'), sortable: true },
  { field: 'domain', header: t('domain'), sortable: true },
  { field: 'startDate', header: t('startDate'), sortable: true },
  { field: 'endDate', header: t('endDate'), sortable: true },
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = projects.value?.filter(project => project?.name?.toLowerCase()?.includes(newValue.toLowerCase()) )
  }
}) 

watchEffect(() => {
  data.value = projects.value
})
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

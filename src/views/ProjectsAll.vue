<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search"/></div>
    <Table :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length"/>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import { storeToRefs } from 'pinia';
import { useProjectsListStore } from '@/stores/projects'; 
import { ref, watchEffect, watch } from 'vue';

const projectsStore = useProjectsListStore()
const { projects } = storeToRefs(projectsStore)

interface DataRow {
    id: string,
    name: string,
    domain: string,
    startDate: string,
    endrDate: string,
    description: string,
    environment: string[],
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'domain', header: 'Domain', sortable: true },
  { field: 'startDate', header: 'Start Date', sortable: true },
  { field: 'endDate', header: 'End Date', sortable: true },
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

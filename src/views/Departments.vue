<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search"/></div>
    <Table v-if="data" :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length || !data.length">
      <template  #default  v-if="!data.length && !search">
        <h2 class="text-2xl font-semibold mb-2">{{ $t('noData') }}</h2>
      </template>
    </NoFound>  
    </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import { storeToRefs } from 'pinia';
import { useDepartmentsStore } from '@/stores/departments'; 
import { ref, watchEffect, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const departmentsStore = useDepartmentsStore()
const { departments } = storeToRefs(departmentsStore)

interface DataRow {
    id: string,
    name: string
}

const search = ref<String>('');
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header:  t('departmentName'), sortable: true },
  { field: 'employees', header:  t('employees'), sortable: true },
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = departments.value?.filter(dep => dep?.name?.toLowerCase()?.includes(newValue.toLowerCase()))
  }
})

watchEffect(() => {
  data.value = departments.value
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

<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search"/></div>
    <Table :tableData="data" :columns="columnsConfig" />
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length"/>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import LibButton from 'primevue/button'
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router'
import { useCVsStore } from '@/stores/cvs'
import { ref, h, watchEffect, watch } from 'vue';

const cvsStore = useCVsStore()
const { cvs } = storeToRefs(cvsStore)
const router = useRouter()

interface DataRow {
  id: string,
  name: string,
  education: string,
  description: string,
  employee: string,
  actionButton: string
}

const search = ref<String>('');
const data = ref<DataRow[]>();
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'education', header: 'Education', sortable: true },
  { field: 'employee', header: 'Employee', sortable: true },
  { field: 'actionButton', header: '', sortable: false,
    customBody: (rowData: DataRow) => {
      return h('div', [
        h(LibButton, {
          icon: 'pi pi-chevron-right',
          iconPos: 'right',
          class: 'p-button-text p-button-secondary custom-button',
          style: { color: '#64748b', borderColor: 'transparent', },
          rounded: true,
          onClick: () => router.push(`/cvs/${rowData.id}`)
        })
      ]);
    }
  }
]);

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = cvs.value?.filter(cv => cv?.name?.toLowerCase()?.includes(newValue.toLowerCase()))
  }
})

watchEffect(() => {
  data.value = cvs.value;
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

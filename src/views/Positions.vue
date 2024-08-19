<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <Table :tableData="data" :columns="columnsConfig"/>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import { storeToRefs } from 'pinia';
import { usePositionssStore } from '@/stores/positions'; 
import { ref, watchEffect } from 'vue';

const positionsStore = usePositionssStore()
const { positions } = storeToRefs(positionsStore)

interface DataRow {
    id: string,
    name: string
}

const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'employees', header: 'Employess', sortable: true },
])

watchEffect(() => {
  data.value = positions.value
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

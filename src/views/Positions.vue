<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search" /></div>
    <Table :tableData="data" :columns="columnsConfig" />
    <NoFound @resetSearch="() => (search = '')" v-if="search && !data.length" />
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue'
import SearchInput from '@/components/ui-kit/SearchInput.vue'
import NoFound from '@/components/ui-kit/NoFound.vue'
import { storeToRefs } from 'pinia'
import { usePositionssStore } from '@/stores/positions'
import { ref, watchEffect, watch } from 'vue'

const positionsStore = usePositionssStore()
const { positions } = storeToRefs(positionsStore)

interface DataRow {
  id: string
  name: string
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'employees', header: 'Employess', sortable: true }
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = positions.value?.filter((post) =>
      post?.name?.toLowerCase()?.includes(newValue.toLowerCase())
    )
  }
})

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

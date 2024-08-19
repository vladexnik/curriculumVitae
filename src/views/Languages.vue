<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <Table :tableData="data" :columns="columnsConfig"/>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import { storeToRefs } from 'pinia';
import { useLanguagesStore } from '@/stores/languages'; 
import { ref, watchEffect } from 'vue';

const languagesStore = useLanguagesStore()
const { languages } = storeToRefs(languagesStore)

interface DataRow {
  id: string,
  name: string,
  nativeName: string,
  iso2: string,
}

const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'nativeName', header: 'Native Name', sortable: true },
  { field: 'iso2', header: 'ISO2', sortable: true },
])

watchEffect(() => {
  data.value = languages.value
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

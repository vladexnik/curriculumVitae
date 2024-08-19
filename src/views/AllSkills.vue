<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <Table :tableData="data" :columns="columnsConfig"/>
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import { storeToRefs } from 'pinia';
import { useSkillsStore } from '@/stores/skills'; 
import { ref, watchEffect } from 'vue';

const skillsStore = useSkillsStore()
const { skills } = storeToRefs(skillsStore)

interface DataRow {
  id: string,
  name: string,
  category: string,
}

const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'category', header: 'Category', sortable: true },
])

watchEffect(() => {
  data.value = skills.value
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

<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search" /></div>
    <Table v-if="data" :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length || !data.length">
      <template  #default  v-if="!data.length && !search">
        <h2 class="text-2xl font-semibold mb-2">{{ $t('noData') }}</h2>
      </template>
    </NoFound>  
    </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue'
import SearchInput from '@/components/ui-kit/SearchInput.vue'
import NoFound from '@/components/ui-kit/NoFound.vue'
import { storeToRefs } from 'pinia'
import { useSkillsStore } from '@/stores/skills'
import { ref, watchEffect, watch } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const skillsStore = useSkillsStore()
const { skills } = storeToRefs(skillsStore)

interface DataRow {
  id: string
  name: string
  type: string
  category: string
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: t('skillName'), sortable: true },
  { field: 'type', header: t('skillType'), sortable: true },
  { field: 'category', header: t('skillCategory'), sortable: true }
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = skills.value?.filter(
      (skill) =>
        skill?.name?.toLowerCase()?.includes(newValue.toLowerCase()) ||
        skill?.category?.toLowerCase()?.includes(newValue.toLowerCase()) ||
        skill?.type?.toLowerCase()?.includes(newValue.toLowerCase())
    )
  }
})

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

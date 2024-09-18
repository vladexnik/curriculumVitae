<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search"/></div>
    <Table v-if="data" :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length || !data.length">
      <template  #default  v-if="!data.length && !search">
        <h2 class="text-2xl font-semibold mb-2">{{ t('noData') }}</h2>
      </template>
    </NoFound>  
    </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import { storeToRefs } from 'pinia';
import { useLanguagesStore } from '@/stores/languages'; 
import { ref, watchEffect, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const languagesStore = useLanguagesStore()
const { languages } = storeToRefs(languagesStore)

interface DataRow {
  id: string,
  name: string,
  nativeName: string,
  iso2: string,
}

const search = ref<String>('');
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: t('lang'), sortable: true },
  { field: 'nativeName', header: t('nativeName'), sortable: true },
  { field: 'iso2', header: t('ISO2'), sortable: true },
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = languages.value?.filter(lang => lang?.name?.toLowerCase()?.includes(newValue.toLowerCase()) || lang?.nativeName?.toLowerCase()?.includes(newValue.toLowerCase()) || lang?.iso2?.toLowerCase()?.includes(newValue.toLowerCase()))
  }
}) 

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

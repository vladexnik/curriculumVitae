<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="d-flex w-[300px] pl-3"><SearchInput v-model="search" /></div>
    <Table v-if="data" :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length || !data.length">
      <template  #default  v-if="!data.length && !search">
        <h2 class="text-2xl font-semibold mb-2">{{ t('noData') }}</h2>
      </template>
    </NoFound>  
  </div>
</template>

<script setup lang="ts">
import Table from '@/components/ui-kit/Table.vue'
import SearchInput from '@/components/ui-kit/SearchInput.vue'
import NoFound from '@/components/ui-kit/NoFound.vue'
import LibButton from 'primevue/button'
import Avatar from 'primevue/avatar'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useUsersListStore } from '@/stores/usersList'
import { ref, h, watchEffect, watch } from 'vue'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const usersStore = useUsersListStore()
const { users } = storeToRefs(usersStore)
const router = useRouter()

interface DataRow {
  id: string
  img: string
  firstName: string
  lastName: string
  email: string
  department: string
  position: string
  actionButton: string
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  {
    field: 'img',
    header: '',
    sortable: false,
    customBody: (rowData: DataRow) => {
      const obj = {
        class: 'custom-avatar',
        style: { backgroundColor: '#ece9fc', color: '#2a1261' },
        shape: 'circle',
        size: 'large'
      }
      if (rowData.img) {
        obj['image'] = rowData.img
      } else {
        obj['icon'] = 'pi pi-user'
      }
      return h(Avatar, obj)
    }
  },
  { field: 'firstName', header: t('firstName'), sortable: true },
  { field: 'lastName', header: t('lastName'), sortable: true },
  { field: 'email', header: t('email'), sortable: true },
  { field: 'department', header: t('department'), sortable: true },
  { field: 'position', header: t('position'), sortable: true },
  {
    field: 'actionButton',
    header: '',
    sortable: false,
    customBody: (rowData: DataRow) => {
      return h('div', [
        h(LibButton, {
          icon: 'pi pi-chevron-right',
          iconPos: 'right',
          class: 'p-button-text p-button-secondary custom-button',
          style: { color: '#64748b', borderColor: 'transparent' },
          rounded: true,
          onClick: () => router.push(`/users/${rowData.id}`)
        })
      ])
    }
  }
])

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = users.value?.filter(
      (user) =>
        user?.firstName?.toLowerCase()?.includes(newValue.toLowerCase()) ||
        user?.lastName?.toLowerCase().includes(newValue.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(newValue.toLowerCase())
    )
  }
})

watchEffect(() => {
  data.value = users.value
})
</script>

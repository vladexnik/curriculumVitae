<template>
  <Toast />
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="inline-flex w-full justify-between">
      <div class="d-flex w-[300px] pl-3">
        <SearchInput v-model="search" class="h-9" />
      </div>
      <div class="d-flex h-10 w-[300px] pl-3">
        <CreateCV @addedCV="updateData" :currentUserId="authedUser.id" />
      </div>
    </div>
    <Table :tableData="data" :columns="columnsConfig" />
    <NoFound @resetSearch="() => (search = '')" v-if="search && !data.length" />
    <RemoveModal
      type="CV"
      :name="cvToDelete?.name"
      v-model="openDeleteConfirmation"
      @reset="reset"
      @remove="deleteCV"
    />
  </div>
</template>

<script setup lang="ts">
import CreateCV from '@/components/ui-kit/CreateCV.vue'
import Table from '@/components/ui-kit/Table.vue'
import SearchInput from '@/components/ui-kit/SearchInput.vue'
import NoFound from '@/components/ui-kit/NoFound.vue'
import LibButton from 'primevue/button'
import Menu from 'primevue/menu'
import RemoveModal from '@/components/ui-kit/RemoveModal.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCVsStore } from '@/stores/cvs'
import { useUserStore } from '@/stores/user'
import { ref, h, watchEffect, watch } from 'vue'
import { useToastNotifications } from '@/composables/useToast'

const userStore = useUserStore()
const { authedUser } = storeToRefs(userStore)
const cvsStore = useCVsStore()
const { cvs } = storeToRefs(cvsStore)
const { deleleteCVbyId } = cvsStore
const router = useRouter()
const { showError } =
  useToastNotifications()

interface DataRow {
  id: string
  name: string
  education: string
  description: string
  employee: string
  actionButton: string
}

const openDeleteConfirmation = ref(false)
const cvToDelete = ref()
const reset = () => {
  cvToDelete.value = null
  openDeleteConfirmation.value = false
}
const deleteCV = async () => {
  try {
    await deleleteCVbyId(cvToDelete.value.id)
    data.value = data.value?.filter((cv) => cv.id !== cvToDelete.value.id)
    cvs.value = data.value
    cvToDelete.value = null
    openDeleteConfirmation.value = false
  } catch (e: unknown) {
    if (e instanceof Error) {
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'education', header: 'Education', sortable: true },
  { field: 'employee', header: 'Employee', sortable: true },
  {
    field: 'actionButton',
    header: '',
    sortable: false,
    customBody: (rowData: DataRow) => {
      if (rowData.employee == authedUser.value?.email) {
        const localMenu = ref(null)
        const toggleMenu = (event) => {
          localMenu.value?.toggle(event)
        }

        const items = [
          {
            label: 'Details',
            command: () => router.push(`/cvs/${rowData.id}`)
          },
          {
            label: 'Delete CV',
            command: () => {
              cvToDelete.value = {
                id: rowData.id,
                name: rowData.name,
                education: rowData.education,
                description: rowData.description
              }
              openDeleteConfirmation.value = true
            }
          }
        ]

        return h('div', { class: 'card flex justify-center' }, [
          h(LibButton, {
            type: 'button',
            icon: 'pi pi-ellipsis-v',
            class: 'p-button-text p-button-secondary custom-button',
            style: { color: '#64748b', borderColor: 'transparent' },
            rounded: true,
            onClick: toggleMenu,
            'aria-haspopup': 'true',
            'aria-controls': `menu_${rowData.id}`
          }),
          h(Menu, {
            ref: localMenu,
            id: `menu_${rowData.id}`,
            model: items,
            popup: true,
            appendTo: 'body'
          })
        ])
      } else {
        return h('div', [
          h(LibButton, {
            icon: 'pi pi-chevron-right',
            iconPos: 'right',
            class: 'p-button-text p-button-secondary custom-button',
            style: { color: '#64748b', borderColor: 'transparent' },
            rounded: true,
            onClick: () => router.push(`/cvs/${rowData.id}`)
          })
        ])
      }
    }
  }
])

const updateData = (obj) => {
  data.value?.push(obj)
  cvs.value = data.value
}

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = cvs.value?.filter((cv) =>
      cv?.name?.toLowerCase()?.includes(newValue.toLowerCase())
    )
  }
})

watchEffect(() => {
  data.value = cvs.value
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

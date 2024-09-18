<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="inline-flex w-full justify-between">
      <div class="d-flex w-[300px] pl-3">
        <SearchInput v-model="search" class="h-9" />
      </div>
      <div class="d-flex h-10 w-[300px] pl-3" v-if="enableEditMode">
        <CreateCV @addedCV="updateData" :currentUserId="currentUserId" />
      </div>
    </div>
    <Table v-if="data" :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length || !data.length">
      <template  #default  v-if="!data.length && !search">
        <h2 class="text-2xl font-semibold mb-2">{{ t('noData') }}</h2>
      </template>
    </NoFound>  
  </div>
  <RemoveModal
    type="CV"
    :name="cvToDelete?.name"
    v-model="openDeleteConfirmation"
    @reset="reset"
    @remove="deleteCV"
  />
</template>

<script setup lang="ts">
import CreateCV from '@/components/ui-kit/CreateCV.vue';
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import LibButton from 'primevue/button';
import Menu from 'primevue/menu';
import RemoveModal from '@/components/ui-kit/RemoveModal.vue';
import { useUserStore } from '@/stores/user'; 
import { useCVsStore } from '@/stores/cvs'; 
import { ref, computed, watch, onMounted, h } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useToastNotifications } from '@/composables/useToast'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const cvsStore = useCVsStore()
const { cvs } = storeToRefs(cvsStore)
const { getCVsByUserId, deleleteCVbyId } = cvsStore
const userStore = useUserStore()
const { authedUser } = storeToRefs(userStore)
const { showError } = useToastNotifications()

const route = useRoute()

interface DataRow {
  id: string
  name: string
  education: string
  description: string
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
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const search = ref<String>('')
const data = ref<DataRow[]>()
const columnsConfig = ref([
  { field: 'name', header: t('cvName'), sortable: true },
  { field: 'education', header: t('education'), sortable: true },
  {
    field: 'actionButton',
    header: '',
    customBody: (rowData: DataRow) => {
      if (enableEditMode.value) {
        const localMenu = ref(null)
        const toggleMenu = (event) => {
          localMenu.value?.toggle(event)
        }

        const items = [
          { label: t('details'), command: () => router.push(`/cvs/${rowData.id}`) },
          { label: t('deleteCV'), command: () => {
            cvToDelete.value = rowData
            openDeleteConfirmation.value = true
          } },
        ];

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

const currentUserId = computed(() => {
  let arr = route.path.split('/')
  return arr[arr.length - 2]
})

const enableEditMode = computed(
  () => authedUser.value.id == currentUserId.value
)

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

onMounted(async () => {
  data.value = await getCVsByUserId(currentUserId.value)
  cvs.value = data.value
})
</script>

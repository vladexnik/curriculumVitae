<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="inline-flex justify-between w-full">
      <div class="d-flex w-[300px] pl-3" >
        <SearchInput v-model="search" class="h-9"/> 
      </div>
      <div class="d-flex w-[300px] pl-3 h-10">
       <Button
          variant="outlined"
          color="primary"
          class="h-9 border-none"
          @click="() => actionOpenModal('Add')"
          >{{ $t('addProject') }}</Button>
      </div>
    </div>
    <Table :tableData="data" :columns="columnsConfig" />
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length">
      <template #default>
        <h2 class="text-2xl font-semibold mb-2">{{ $t('customNoResultsTitle') }}</h2>
        <p class="text-gray-500 mb-4">{{ $t('customNoResultsDescription') }}</p>
      </template>
    </NoFound>  
    <RemoveModal type="Project" :name="projectToDelete?.name" v-model="openDeleteConfirmation" @reset="reset" @remove="deleteProject"/> 
    <AddUpdateProjectModal v-model="openModal" @updateProject="updateData" @reset="resetModalData" :type="type" :dataToUpdate="dataToUpdate" :projectsToExclude="projectsToExclude"/>
    <Toast />
  </div>
</template>


<script setup lang="ts">
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import Table from '@/components/ui-kit/Table.vue';
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateProjectModal from '@/components/ui-kit/AddUpdateProjectModal.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import LibButton from 'primevue/button'
import Menu from 'primevue/menu';
import RemoveModal from '@/components/ui-kit/RemoveModal.vue';
import { useProjectsListStore } from '@/stores/projects'
import { useUserStore } from '@/stores/user';
import { ref, h, watchEffect, watch, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router'
import { useToastNotifications } from '@/composables/useToast'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const { showError, showSuccessUpload, showProfileUpdate } =
  useToastNotifications()

const projectsStore = useProjectsListStore()
const projectsByCVId = ref()
const {
    getProjectsByCVId,
    deleleteProjectbyId,
    updateProjectbyId,
    addProjectbyId
   } = projectsStore;

const projectsToExclude = computed(() =>  projectsByCVId.value.map(el => el.id))
const route = useRoute()

const currentCVId = computed(() => route.params.id)
const dataToUpdate = ref()

interface DataRow {
  id: string
  name: string
  domain: string
  startDate: string
  endDate: string
  description: string
  responsibilities: string
  actionButton: string
}

const openDeleteConfirmation = ref(false)
const projectToDelete = ref()
const reset = () => {
  projectToDelete.value = null
  openDeleteConfirmation.value = false
}
const deleteProject = async () => {
  try {
    const response  = await deleleteProjectbyId(currentCVId.value, projectToDelete.value.id)
    if (response) {
      projectsByCVId.value = response;
      showProfileUpdate('Succesfully deleted');
    }
    projectToDelete.value = null
    openDeleteConfirmation.value = false
  } catch (error) {
      console.error(error);
      showError();
    }
}

const search = ref<String>('');
const data = ref<DataRow[]>();
const columnsConfig = ref([
  { field: 'name', header: $t('projectName'), sortable: true },
  { field: 'domain', header: $t('domain'), sortable: true },
  { field: 'startDate', header:  $t('startDate'), sortable: true },
  { field: 'endDate', header:  $t('endDate'), sortable: true },
  {
    field: 'actionButton',
    header: '',
    sortable: false,
    customBody: (rowData: DataRow) => {
        const localMenu = ref(null);    
        const toggleMenu = (event) => {
          localMenu.value?.toggle(event);
        };

        const items = [
          { label: $t('updatePproject'), command: () => actionOpenModal('Update', rowData) },
          { label: $t('removePproject'), command: () => {
            projectToDelete.value = {
              id: rowData.id,
              name: rowData.name,
              domain: rowData.domain,
              startDate: rowData.startDate,
              endDate: rowData.endDate
            }
            openDeleteConfirmation.value = true
          } },
        ];

        return h(
          'div',
          { class: 'card flex justify-center' },
          [
            h(LibButton, {
              type: 'button',
              icon: 'pi pi-ellipsis-v',
              class: 'p-button-text p-button-secondary custom-button',
              style: { color: '#64748b', borderColor: 'transparent' },
              rounded: true,
              onClick: toggleMenu,
              'aria-haspopup': 'true',
              'aria-controls': `menu_${rowData.id}`,
            }),
            h(Menu, {
              ref: localMenu,
              id: `menu_${rowData.id}`,
              model: items,
              popup: true,
              appendTo: 'body',
            })
          ]
        );
    }
  }
])

const openModal = ref(false)
const type = ref('Add')

const actionOpenModal = (str, el) => {
  if (str == 'Update') dataToUpdate.value = el
  type.value = str;
  openModal.value = true;
}

const resetModalData = () => {
  dataToUpdate.value = {}
}

const updateData = async (obj) => {
  try {
    const newObj = {
      cvId: currentCVId.value,
      start_date: obj.startDate,
      end_date: obj.endDate,
      responsibilities: [obj.responsibilities],
      roles: [],
      projectId: obj.id || Math.random()
    }
    let response
    if (type.value === 'Add') {
      response = await addProjectbyId(newObj);
      if (response) showSuccessUpload('New Project was succesfully added')
    } else if (type.value === 'Update') {
      response = await updateProjectbyId(newObj);
      if (response) showProfileUpdate('Data was succesfully updated')

    }
    projectsByCVId.value = response;  
  } catch (e) {
    console.log(e)
    showError()
  }
}

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = projectsByCVId.value?.filter((cv) =>
      cv?.name?.toLowerCase()?.includes(newValue.toLowerCase())
    )
  }
})

watchEffect(() => {
  data.value = projectsByCVId.value
})

onMounted( async () => {
  projectsByCVId.value = await getProjectsByCVId(currentCVId.value)
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

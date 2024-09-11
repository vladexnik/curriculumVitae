<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="filteredData">
    <div class="inline-flex justify-between w-full">
      <div class="d-flex w-[300px] pl-3">
        <SearchInput v-model="search" class="h-9"/> 
      </div>
      <div class="d-flex w-[300px] pl-3 h-10">
        <CreateCV @addedCV="updateData" :currentUserId="authedUser?.id"/>
      </div>
    </div>
    <Table v-if="filteredData" :tableData="filteredData" :columns="columnsConfig" />
    <NoFound @resetSearch="() => search = ''" v-if="search && !filteredData.length">
      <template #default>
        <h2 class="text-2xl font-semibold mb-2">{{ $t('customNoResultsTitle') }}</h2>
        <p class="text-gray-500 mb-4">{{ $t('customNoResultsDescription') }}</p>
      </template>
    </NoFound>
    <RemoveModal type="CV" :name="cvToDelete?.name" v-model="openDeleteConfirmation" @reset="reset" @remove="deleteCV"/>  
  </div>
</template>

<script setup lang="ts">
import { ref, computed, h } from 'vue';
import { useCVsStore } from '@/stores/cvs';
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import CreateCV from '@/components/ui-kit/CreateCV.vue';
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import LibButton from 'primevue/button'
import Menu from 'primevue/menu';
import RemoveModal from '@/components/ui-kit/RemoveModal.vue';
import { storeToRefs } from 'pinia'

const { t } = useI18n();
const router = useRouter();

const userStore = useUserStore();
const cvsStore = useCVsStore();
const { authedUser } = storeToRefs(userStore);
const { cvs } = storeToRefs(cvsStore);

const openDeleteConfirmation = ref(false);
const cvToDelete = ref(null);
const search = ref('');

const columnsConfig = ref([
  { field: 'name', header: t('cvName'), sortable: true },
  { field: 'education', header: t('education'), sortable: true },
  { field: 'employee', header: t('employee'), sortable: true },
  {
    field: 'actionButton',
    header: '',
    sortable: false,
    customBody: (rowData: DataRow) => {
      if (rowData.employee == authedUser.value?.email) {
        const localMenu = ref(null);    
        const toggleMenu = (event) => {
          localMenu.value?.toggle(event);
        };

        const items = [
          { label: t('details'), command: () => router.push(`/cvs/${rowData.id}`) },
          { label: t('deleteCV'), command: () => {
            cvToDelete.value = {
              id: rowData.id,
              name: rowData.name,
              education: rowData.education,
              description: rowData.description,
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
      ]);
      }
    }
  }
])

const filteredData = computed(() => {
  if (!cvs.value) return [];  // Ensure `cvs.value` is defined
  return cvs.value.filter(cv => cv.name.toLowerCase().includes(search.value.toLowerCase()));
});

const deleteCV = async () => {
  await cvsStore.deleleteCVbyId(cvToDelete.value.id);
  cvsStore.removeCV(cvToDelete.value.id);  // Modify the store
  reset();
};

const updateData = (obj) => {
  cvsStore.addCV(obj);  // Modify the store
};

const reset = () => {
  cvToDelete.value = null;
  openDeleteConfirmation.value = false;
};
</script>

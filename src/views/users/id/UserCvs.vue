<template>
  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4" v-if="data">
    <div class="inline-flex justify-between w-full">
      <div class="d-flex w-[300px] pl-3" >
        <SearchInput v-model="search" class="h-9"/> 
      </div>
      <div class="d-flex w-[300px] pl-3 h-10" v-if="enableEditMode" >
        <Button variant="outlined" color="primary" class="border-none h-9" @click="openAddModal=true">Create CV +</Button>
      </div>
    </div>
    <Table :tableData="data" :columns="columnsConfig"/>
    <NoFound @resetSearch="() => search = ''" v-if="search && !data.length"/>
  </div>
  <Dialog v-model:visible="openAddModal" modal header="Create CV" :style="{ width: '40rem' }">
    <div class="mb-4 mx-2">
      <form class="d-flex w-full m-4 gap-4">
        <div class="d-flex mb-5 mr-5">
        <TextField 
          v-model="formData.name"
          type="text"
          :error="v$.name.$errors[0]?.$message"
          >Name</TextField
        >
      </div>

      <div class="d-flex mb-5 mr-5">
        <TextField
          v-model="formData.education"
          type="text"
        >
          Education
        </TextField>
        </div>

        <div class="d-flex mb-5 mr-5">
          <TextArea
          v-model="formData.description"
          type="text"
          :error="v$.description.$errors[0]?.$message"
        >
          Description
        </TextArea>
        </div>
  </form>
        <div class="flex justify-end gap-5">
          <div class="w-[150px]">
            <Button variant="text" color="secondary" @click="openAddModal = false">Cancel</Button>
          </div>
          <div class="w-[150px]">
            <Button variant="text" color="secondary" @click="submitForm" :disabled="disableCreation">Create</Button>
          </div>
        </div>
    </div>
</Dialog>
<Dialog v-model:visible="openDeleteConfirmation" modal header="Delete CV" :style="{ width: '45rem' }">
  <p>Are you sure you want to delete CV {{ cvToDelete.name }}</p>

  <div class="flex justify-end gap-5">
    <div class="w-[150px]">
      <Button variant="text" color="secondary" @click="reset">Cancel</Button>
    </div>
    <div class="w-[150px]">
      <Button variant="contained" color="primary" @click="deleteCV">Confirm</Button>
    </div>
  </div>
</Dialog>
</template>

<script setup lang="ts">

import TextField from '@/components/ui-kit/TextField.vue'
import TextArea from '@/components/ui-kit/TextArea.vue'
import Table from '@/components/ui-kit/Table.vue';
import SearchInput from '@/components/ui-kit/SearchInput.vue';
import NoFound from '@/components/ui-kit/NoFound.vue';
import LibButton from 'primevue/button';
import Menu from 'primevue/menu';
import Button from '@/components/ui-kit/Button.vue';
import Dialog from 'primevue/dialog';
import { useUserStore } from '@/stores/user'; 
import { useCVsStore } from '@/stores/cvs'; 
import { ref, computed, watch, onMounted, h, reactive } from 'vue';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import router from '@/router';

import useVuelidate from '@vuelidate/core'

import { required, minLength, helpers } from '@vuelidate/validators'
import { REQUIRED_FIELD } from '@/components/ui-kit/constants/constants' 

const cvsStore = useCVsStore();
const { cvs } = storeToRefs(cvsStore);
const { getCVsByUserId, deleleteCVbyId, createNewCV } = cvsStore;
const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

const route = useRoute();

interface DataRow {
  id: string;
  name: string;
  education: string;
  description: string;
}

const openAddModal = ref(false)
const openDeleteConfirmation = ref(false)
const cvToDelete = ref()
const reset = () => {
  cvToDelete.value = null
  openDeleteConfirmation.value = false
}
const deleteCV = async () => {
  await deleleteCVbyId(cvToDelete.value.id)
  data.value = data.value?.filter(cv => cv.id !== cvToDelete.value.id)
  cvs.value = data.value
  cvToDelete.value = null
  openDeleteConfirmation.value = false
}

const search = ref<String>('');
const data = ref<DataRow[]>();
const columnsConfig = ref([
  { field: 'name', header: 'Name', sortable: true },
  { field: 'education', header: 'Education', sortable: true },
  {
    field: 'actionButton', 
    header: '', 
    customBody: (rowData: DataRow) => {

      if (enableEditMode.value) {
        const localMenu = ref(null);    
        const toggleMenu = (event) => {
          localMenu.value?.toggle(event);
        };

        const items = [
          { label: 'Details', command: () => router.push(`/cvs/${rowData.id}`) },
          { label: 'Delete CV', command: () => {
            cvToDelete.value = rowData
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
          style: { color: '#64748b', borderColor: 'transparent', },
          rounded: true,
          onClick: () => router.push(`/cvs/${rowData.id}`)
        })
      ]);
      }
    }
  }
]);

const currentUserId = computed(() => {
  let arr = route.path.split('/');
  return arr[arr.length - 2];
});

const enableEditMode = computed(() => authedUser.value.user.id == currentUserId.value);
const formData = reactive({
  education: '',
  description: '',
  name: '',
  userId: currentUserId,
}) 

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(2)
    },
    description: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(2)
    }
  }
})

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    const res = await createNewCV(formData);
    if (res) {
      const { id, education, name, description } = res.createCv;
      data.value?.push({id, name, education, description})
      cvs.value = data.value
      openAddModal.value = false
      formData.name = ''
      formData.education = ''
      formData.description = ''
      v$.value.$reset();
    }
  }
}

const disableCreation = computed(() => {
  if (formData.name || formData.description || formData.education) return false
  return true
})

watch(search, (newValue) => {
  if (typeof newValue === 'string' && data.value) {
    data.value = cvs.value?.filter(cv => cv?.name?.toLowerCase()?.includes(newValue.toLowerCase()));
  }
});

onMounted(async () => {
  data.value = await getCVsByUserId(currentUserId.value);
  cvs.value = data.value;
});
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

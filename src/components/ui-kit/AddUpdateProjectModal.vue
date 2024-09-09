<template>
  <Dialog
    v-model:visible="openModal"
    modal
    :header="header"
    :style="{ width: '50rem' }"
  >
    <div class="mx-2 mb-4">
      <form class="d-flex m-4 w-full gap-4">
      <div class="inline-flex w-full">
        <div class="d-flex mb-5 mr-5 w-full">
          <SelectComp
            v-model="project"
            :options="projectsNames"
            :disabled="projectFieldDisabled"
            placeholder="Project"
          />
        </div>

        <div class="d-flex mb-5 mr-5 w-full">
          <TextField v-model="formData.domain" type="text" disabled>
            Domain
          </TextField>
        </div>
      </div>

      <div class="inline-flex w-full">
        <div class="d-flex mb-5 mr-5 w-full">
          <CustomDatePicker v-model="formData.startDate" placeholder="Start Date"/>
        </div>

        <div class="d-flex mb-5 mr-5 w-full">
          <CustomDatePicker v-model="formData.endDate" placeholder="End Date"/>
        </div>
      </div>

        <div class="d-flex mb-5 mr-5">
          <TextArea
            v-model="formData.description"
            type="text"
            disabled
          >
            Description
          </TextArea>
        </div>

        <div class="d-flex mb-5 mr-5">
          <TextField
            v-model="formData.responsibilities"
            type="text"
            >Responsibilities</TextField
          >
        </div>

      </form>
      <div class="flex justify-end gap-5">
        <div class="w-[150px]">
          <Button variant="text" color="secondary" @click="cancel"
            >Cancel</Button
          >
        </div>
        <div class="w-[150px]">
          <Button
            variant="text"
            color="secondary"
            @click="submitForm"
            :disabled="disableCreation"
            >{{ type }}</Button
          >
        </div>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import Button from '@/components/ui-kit/Button.vue'
import Dialog from 'primevue/dialog'
import TextField from '@/components/ui-kit/TextField.vue'
import TextArea from '@/components/ui-kit/TextArea.vue'
import CustomDatePicker from './CustomDatePicker.vue'
import SelectComp from './SelectComp.vue'
import { useProjectsListStore } from '@/stores/projects'
import { computed, reactive, toRefs, watch, ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

const projectsStore = useProjectsListStore();
const { projects } = storeToRefs(projectsStore)

const props = defineProps({
  type: String,
  modelValue: Boolean,
  dataToUpdate: Object,
  projectsToExclude: Array
});

const emit = defineEmits(['update:modelValue', 'reset', 'updateProject']);

const { type, modelValue, dataToUpdate, projectsToExclude } = toRefs(props);

const openModal = computed({
  get: () => modelValue.value,
  set: (value) => emit('update:modelValue', value)
});

const cancel = () => {
  emit('reset');
  clearFields()
};

const clearFields = () => {
  openModal.value = false;
  formData.responsibilities = ''
  formData.endDate = ''
  formData.description = ''
  formData.startDate = ''
  formData.domain = ''
  formData.project = ''
  formData.id = ''
  project.value = ''
  projectFieldDisabled.value = false
}

const formData = reactive({
  project: '',
  domain: '',
  startDate: '',
  endDate: '',
  description: '',
  responsibilities: '',
  id: ''
})

const submitForm = () => {
  emit('updateProject', formData);
  clearFields()
}
const header = computed(() => {
  return (type?.value === 'Add' ? 'Add ' : 'Update ') + 'Project';
});

const disableCreation = computed(() => {
  if (!!formData.project || !!formData.startDate || !!formData.endDate || !!formData.responsibilities) return false
  return true
})

const project = ref()
const projectFieldDisabled = ref(false)
const projectsNames = computed(() => projects?.value?.filter(el => !projectsToExclude?.value?.includes(el.id)).map(el => ({ id: el.id, name: el.name})))

watch(project, (newVal) => {
  if (newVal) {
    formData.project = newVal.name;
    const obj = projects?.value?.find(el => el.id === newVal.id);

    if (obj) {
      formData.domain = obj.domain;
      formData.startDate = obj.startDate;
      formData.endDate = obj.endDate;
      formData.description = obj.description;
      formData.id = obj.id
    }
  }
});

watch(openModal, (newVal) => {
  if (!newVal) clearFields()
})

watchEffect(() => {
  if (dataToUpdate?.value && type?.value === 'Update') {
      formData.id = dataToUpdate.value.id
      formData.domain =  dataToUpdate.value.domain;
      formData.startDate =  dataToUpdate.value.startDate;
      formData.endDate =  dataToUpdate.value.endDate;
      formData.description =  dataToUpdate.value.description;
      formData.responsibilities =  dataToUpdate.value.environment[0]
      formData.project =  dataToUpdate.value.name
      project.value = { id: dataToUpdate.value.id, name: dataToUpdate.value.name}
      projectFieldDisabled.value = true;
  }

})

</script>

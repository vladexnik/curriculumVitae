
<template>
  <Button
    variant="outlined"
    color="primary"
    class="h-9 border-none"
    @click="openAddModal = true"
  
    >{{t('createCV')}} +</Button
  >
  <Dialog
    v-model:visible="openAddModal"
    modal
    :header="t('createCV')"
    :style="{ width: '40rem' }"
  >
    <div class="mx-2 mb-4">
      <form class="d-flex m-4 w-full gap-4">
        <div class="d-flex mb-5 mr-5">
          <TextField
            v-model="formData.name"
            type="text"
            :error="v$.name.$errors[0]?.$message"
            >{{t('cvName')}}</TextField
          >
        </div>
 
        <div class="d-flex mb-5 mr-5">
          <TextField v-model="formData.education" type="text">
            {{t('education')}}
          </TextField>
        </div>
 
        <div class="d-flex mb-5 mr-5">
          <TextArea
            v-model="formData.description"
            type="text"
            :error="v$.description.$errors[0]?.$message"
          >
          {{t('description')}}
          </TextArea>
        </div>
        
      </form>
      <div class="flex justify-end gap-5">
        <div class="w-[150px]">
          <Button variant="text" color="secondary" @click="openAddModal = false"
            >{{t('cancel')}}</Button
          >
        </div>
        <div class="w-[150px]">
          <Button
            variant="text"
            color="secondary"
            @click="submitForm"
            :disabled="disableCreation"
            >{{t('create')}}</Button
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
 import { useCVsStore } from '@/stores/cvs'
 import { ref, computed, reactive } from 'vue'
import { useI18n } from 'vue-i18n';
 
const { t } = useI18n();
 
 import useVuelidate from '@vuelidate/core'
 import { required, minLength, helpers } from '@vuelidate/validators'
 import { REQUIRED_FIELD } from '@/components/ui-kit/constants/constants'
 import { useToastNotifications } from '@/composables/useToast'
 


 export interface IFormData {
  education: string
  description: string
  name: string
  userId: string
  employee: string
}

 
 const props = defineProps<{
  currentUserId: string,
  currentUserEmail: string
 }>()
 
 
 const cvsStore = useCVsStore()
 const { createNewCV } = cvsStore
 const { showError } = useToastNotifications()
 
 
 const openAddModal = ref(false)
 const formData = reactive<IFormData>({
  education: '',
  description: '',
  name: '',
  userId: props.currentUserId,
  employee: props.currentUserEmail
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
 const emit = defineEmits(['addedCV'])
 const submitForm = async () => {
  try {
    const result = await v$.value.$validate()
    if (result) {
      const res = await createNewCV(formData)
      if (res) {
        const { id, education, name, description } = res.createCv
        emit('addedCV', { id, education, name, description, employee: formData.employee })
        openAddModal.value = false
        formData.name = ''
        formData.education = ''
        formData.description = ''
        v$.value.$reset()
      }
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
 }
 
 
 const disableCreation = computed(() => {
  if (formData.name || formData.description || formData.education) return false
  return true
 })
 </script>
 
 
 
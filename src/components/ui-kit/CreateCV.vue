<template>
  <Button
    variant="outlined"
    color="primary"
    class="h-9 border-none"
    @click="openAddModal = true"
    >Create CV +</Button
  >
  <Dialog
    v-model:visible="openAddModal"
    modal
    header="Create CV"
    :style="{ width: '40rem' }"
  >
    <div class="mx-2 mb-4">
      <form class="d-flex m-4 w-full gap-4">
        <div class="d-flex mb-5 mr-5">
          <TextField
            v-model="formData.name"
            type="text"
            :error="v$.name.$errors[0]?.$message"
            >Name</TextField
          >
        </div>

        <div class="d-flex mb-5 mr-5">
          <TextField v-model="formData.education" type="text">
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
          <Button variant="text" color="secondary" @click="openAddModal = false"
            >Cancel</Button
          >
        </div>
        <div class="w-[150px]">
          <Button
            variant="text"
            color="secondary"
            @click="submitForm"
            :disabled="disableCreation"
            >Create</Button
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

import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers } from '@vuelidate/validators'
import { REQUIRED_FIELD } from '@/components/ui-kit/constants/constants'

const props = defineProps({
  currentUserId: String
})

const cvsStore = useCVsStore()
const { createNewCV } = cvsStore

const openAddModal = ref(false)
const formData = reactive({
  education: '',
  description: '',
  name: '',
  userId: props.currentUserId
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
  const result = await v$.value.$validate()
  if (result) {
    const res = await createNewCV(formData)
    if (res) {
      const { id, education, name, description } = res.createCv
      emit('addedCV', { id, education, name, description })
      openAddModal.value = false
      formData.name = ''
      formData.education = ''
      formData.description = ''
      v$.value.$reset()
    }
  }
}

const disableCreation = computed(() => {
  if (formData.name || formData.description || formData.education) return false
  return true
})
</script>

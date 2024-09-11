<template>
  <div
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 py-8"
  >
    <Toast />
    <form class="grid grid-cols-2 gap-y-8">
      <TextField
        ref="nameField"
        class="col-span-2"
        v-model="formData.name"
        :error="v$.name.$errors[0]?.$message"
        type="text"
        :disabled="isDisabled"
      >
        Name
      </TextField>
      <TextField
        class="col-span-2"
        v-model="formData.education"
        type="text"
        :disabled="isDisabled"
      >
        Education
      </TextField>
      <TextArea
        ref="descriptionField"
        class="col-span-2"
        v-model="formData.description"
        :error="v$.description.$errors[0]?.$message"
        type="text"
        :disabled="isDisabled"
      >
        Description
      </TextArea>
      <Button
        v-if="!isDisabled"
        class="col-start-2 col-end-4 mt-5"
        variant="contained"
        color="primary"
        @click.prevent="submitForm"
        :disabled="isDisabledBtn"
      >
        Update
      </Button>
    </form>
  </div>
</template>
<script lang="ts" setup>
import TextField from '@/components/ui-kit/TextField.vue'
import TextArea from '@/components/ui-kit/TextArea.vue'
import Button from '@/components/ui-kit/Button.vue'
import { computed, reactive, ref, watchEffect } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, helpers, maxLength } from '@vuelidate/validators'
import { REQUIRED_FIELD } from '@/components/ui-kit/constants/constants'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { getCVDetailsById, updateCVDetails } from '@/service/cvs'
import { useToastNotifications } from '@/composables/useToast'
import type { cvDetailsDataT } from '@/models/models'

const userStore = useUserStore()
const route = useRoute()
const isDisabled = ref(true)
const id = ref(`${route.params.id}`)
const nameField = ref<HTMLInputElement | null>(null)
const descriptionField = ref<HTMLInputElement | null>(null)
const cvDetailsData = ref<cvDetailsDataT | undefined | null>(null)
const { showError, showProfileUpdate } = useToastNotifications()

const formData = reactive({
  cvId: '',
  name: '',
  education: '',
  description: ''
})

const isDisabledBtn = computed(() => {
  if (cvDetailsData.value) {
    const bool =
      formData.name === cvDetailsData.value.name &&
      formData.education === cvDetailsData.value.education &&
      formData.description === cvDetailsData.value.description
    return bool
  } else {
    return true
  }
})

const rules = computed(() => {
  return {
    name: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      maxLength: maxLength(100)
    },
    description: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(5)
    }
  }
})
const v$ = useVuelidate(rules, formData)

async function setFormData() {
  try {
    cvDetailsData.value = await getCVDetailsById(id.value)
    if (cvDetailsData.value) {
      formData.name = cvDetailsData.value.name || ''
      formData.description = cvDetailsData.value.description || ''
      formData.education = cvDetailsData.value.education || ''
      formData.cvId = cvDetailsData.value?.id || ''

      isDisabled.value =
        userStore.authedUser?.id !== cvDetailsData.value?.user?.id
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
async function submitForm() {
  try {
    const result = await v$.value.$validate()

    if (!result) {
      const nameError = v$.value.name.$errors[0]
      if (nameError) {
        nameField.value?.focus()
      } else {
        descriptionField.value?.focus()
      }
    } else {
      cvDetailsData.value = await updateCVDetails(formData)
      if (cvDetailsData.value) {
        showProfileUpdate('CV was updated')
      } else {
        showError()
      }
    }
  } catch (err: unknown) {
    showError()
  }
}

watchEffect(() => {
  setFormData()
})
</script>
<style></style>

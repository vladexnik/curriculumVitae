<script setup lang="ts">
import Button from './ui-kit/Button.vue'
import TextField from './ui-kit/TextField.vue'
import SearchInput from './ui-kit/SearchInput.vue'
import SelectComp from '../components/ui-kit/SelectComp.vue'
import type { Option } from '../components/ui-kit/SelectComp.vue'
import { reactive, ref, watchEffect, computed, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { REQUIRED_FIELD } from './ui-kit/constants/constants'

const formData = reactive({
  email: '',
  password: '',
  name: ''
})

const inputString = ref('')
const selectedCity = ref(null)
const cities = ref<Option[]>([
  { name: 'not choosen', code: '' },
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' }
])

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(5),
      email: helpers.withMessage(REQUIRED_FIELD, email)
    },
    password: {
      required: helpers.withMessage(REQUIRED_FIELD, required),
      minLength: minLength(5)
    }
  }
})

const v$ = useVuelidate(rules, formData)

onMounted(() => {
  emailField.value?.focus()
})

watchEffect(() => {
  console.log(inputString.value)
})

const emailField = ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (emailField.value) {
    emailField.value.focus()
  }
})

const submitForm = async () => {
  const result = await v$.value.$validate()
  if (result) {
    alert('success, form submitted!')
    formData.email = ''
    formData.password = ''
  } else {
    alert('Error, form not submitted!')
  }
}
</script>

<template>
  <form @submit.prevent="submitForm" class="d-flex w-max-[400px] mx-4 gap-4">
    <TextField ref="emailField" v-model="formData.name" type="text"
      >Name</TextField
    >
    <TextField
      v-model="formData.email"
      type="text"
      :error="v$.email.$errors[0]?.$message"
    >
      Email
    </TextField>
    <TextField
      v-model="formData.password"
      type="password"
      :error="v$.password.$errors[0]?.$message"
    >
      Password
    </TextField>
    <Button variant="contained" color="primary" type="submit">sign in</Button>
  </form>

  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4">
    <SearchInput class="my-5" v-model="inputString" />
    <div class="flex gap-5">
      <Button variant="contained" color="primary">sign in</Button>
      <Button variant="outlined" color="primary">Outlined</Button>
      <Button variant="text" color="secondary">Text</Button>
    </div>
    <SelectComp
      class="my-5"
      v-model="selectedCity"
      :options="cities"
      placeholder="Select the country"
    />
  </div>
</template>

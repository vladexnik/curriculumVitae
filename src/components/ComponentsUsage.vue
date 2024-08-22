<script setup lang="ts">
import Button from './ui-kit/Button.vue'
import TextField from './ui-kit/TextField.vue'
import SearchInput from './ui-kit/SearchInput.vue'
import SelectComp from '../components/ui-kit/SelectComp.vue'
import Table from './ui-kit/Table.vue'
import type { Option } from '../components/ui-kit/SelectComp.vue'
import { reactive, ref, watchEffect, computed, onMounted } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'
import { REQUIRED_FIELD } from './ui-kit/constants/constants'

import Dr from './ui-kit/Dr.vue'

import LibButton from 'primevue/button'
import Avatar from 'primevue/avatar'
import { h } from 'vue'
import NoFound from './ui-kit/NoFound.vue'

interface DataRow {
  img: string,
  firstName: string,
  lastName: string,
  department: string,
  position: string,
  actionButton: string
}

const data = ref<DataRow[]>([
{
  img: "https://www.gravatar.com/avatar/05dfd4b41340d09cae045235eb0893c3?d=mp",
  firstName: 'Ahel',
  lastName: "Ark",
  department: ".NET",
  position: "Enginner",
  actionButton: "",
},
{
  img: "",
  firstName: 'Marco',
  lastName: "Blandy",
  department: "BA",
  position: "BA",
  actionButton: "actionButton",
}
]);

const columnsConfig = ref([
  { field: 'img', header: '', sortable: false,
  customBody: (rowData: DataRow) => {
      const obj = {
        class: 'custom-avatar', 
        style: { backgroundColor: '#ece9fc', color: '#2a1261' },
        shape: 'circle',
        size: 'large'
      };
      if (rowData.img) {
        obj['image'] = rowData.img;
      } else {
        obj['icon'] = "pi pi-user";
      }
      return h(Avatar, obj);
    }
   },
  { field: 'firstName', header: 'First Name', sortable: false },
  { field: 'lastName', header: 'Last Name', sortable: false },
  { field: 'department', header: 'Department', sortable: true },
  { field: 'position', header: 'Position', sortable: false },
  { field: 'actionButton', header: '', sortable: false,
    customBody: (rowData: DataRow) => {
      return h('div', [
        h(LibButton, {
          icon: 'pi pi-chevron-right',
          iconPos: 'right',
          class: 'p-button-text p-button-secondary custom-button',
          style: { color: '#64748b', borderColor: 'transparent', },
          rounded: true,
          onClick: () => alert(`Button clicked for ${rowData.firstName}`)
        })
      ]);
    }
  }
]);

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
      email
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

  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4">
    <Table :tableData="data" :columns="columnsConfig" />
  </div>

  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4">
    <NoFound />
  </div>

  <div class="d-flex w-max-[500px] m-4 max-w-full gap-4">
    <Dr />
  </div>
</template>

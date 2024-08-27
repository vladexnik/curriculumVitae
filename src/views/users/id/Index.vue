<template>
  <div
    v-if="userData?.profile"
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 pb-8"
  >
    <div class="my-8 flex items-center justify-center gap-5">
      <div class="relative">
        <Avatar
          v-if="!userData.profile.avatar"
          label="V"
          class="flex items-center justify-center text-bgColor"
          size="xlarge"
          style="background-color: var(--color-primary)"
          shape="circle"
        />
        <Avatar
          v-else
          :image="userData.profile.avatar"
          size="xlarge"
          shape="circle"
          class="flex items-center justify-center"
        />
        <i
          class="pi pi-times absolute right-2 top-[-40px] cursor-pointer rounded-2xl p-2 text-textMain duration-300 hover:bg-optionHover"
          style="font-size: 1rem"
          v-ripple
        ></i>
      </div>
      <div>
        <div>
          <div class="flex items-center gap-3">
            <i
              class="pi pi-upload cursor-pointer rounded-2xl p-2 text-textMain duration-300 hover:bg-optionHover"
              style="font-size: 1rem"
              v-ripple
            ></i>
            <span class="text-xl font-medium text-white"
              >Upload avatar image</span
            >
          </div>
          <p class="text-textSec">png, jpg or gif no more than 0.5MB</p>
        </div>
      </div>
    </div>
    <div class="mb-16 flex flex-col items-center">
      <h2 class="text-white">{{ userData.profile.full_name }}</h2>
      <p class="mt-2 text-textSec">{{ userData.email }}</p>
      <p class="text-white">
        A member since
        {{ formatedDate }}
      </p>
    </div>

    <form
      v-if="userData?.profile"
      class="pointer-events-auto grid grid-cols-2 gap-x-8 gap-y-8"
    >
      <TextField
        v-model="formProfile.firstName"
        type="text"
        :disabled="isDisabled"
      >
        First Name
      </TextField>
      <TextField
        v-model="formProfile.lastName"
        type="text"
        :disabled="isDisabled"
      >
        Last Name
      </TextField>
      <SelectComp
        v-model="formProfile.selectedDepartment"
        :options="departments"
        placeholder="Department"
        :disabled="isDisabled"
      />
      <SelectComp
        v-model="formProfile.selectedPosition"
        :options="positions"
        placeholder="Position"
        :disabled="isDisabled"
      />
      <Button
        v-if="!isDisabled"
        class="col-start-2 col-end-3"
        variant="contained"
        color="primary"
        @click.prevent="updateProfile"
      >
        Update
      </Button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watch, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui-kit/Button.vue'
import TextField from '@/components/ui-kit/TextField.vue'
import SelectComp, { type Option } from '@/components/ui-kit/SelectComp.vue'
import Avatar from 'primevue/avatar'
import {
  getAllDepartments,
  getAllPositions,
  updatePosition
} from '@/service/profile'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils'
import { getUserData } from '@/service/userData'

const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const userId = computed(() => userStore.authedUser?.user.id)
const userData = ref<any>(null)

const formatedDate = computed(() =>
  userData.value ? formatDate(userData.value.created_at) : ''
)

const departments = ref<Option[]>([])
const positions = ref<Option[]>([])
const isDisabled = ref(false)

const formProfile = reactive({
  selectedDepartment: null as Option | null,
  selectedPosition: null as Option | null,
  firstName: '',
  lastName: ''
})

const fetchUserData = async () => {
  try {
    if (id.value && id.value !== userId.value) {
      const anotherUser = await getUserData(id.value)
      userData.value = anotherUser.user
      isDisabled.value = true
    } else {
      userData.value = userStore.authedUser?.user
      isDisabled.value = false
    }

    formProfile.firstName = userData.value.profile.first_name
    formProfile.lastName = userData.value.profile.last_name
    setSelectValues()
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
}

const fetchSelectsData = async () => {
  try {
    const [departmentsData, positionsData] = await Promise.all([
      getAllDepartments(),
      getAllPositions()
    ])

    departments.value = [
      { name: 'No department', id: '' },
      ...departmentsData.departments
    ]
    positions.value = [
      { name: 'No position', id: '' },
      ...positionsData.positions
    ]
    setSelectValues()
  } catch (e) {
    console.error('Error fetching departments and positions:', e)
  }
}

const setSelectValues = () => {
  if (userData.value && departments.value.length && positions.value.length) {
    formProfile.selectedDepartment =
      departments.value.find(
        (department) => department.name === userData.value.department_name
      ) || null
    formProfile.selectedPosition =
      positions.value.find(
        (position) => position.name === userData.value.position_name
      ) || null
  }
}

watchEffect(() => {
  console.log(formProfile.selectedPosition)
})

const updateProfile = async () => {
  await updatePosition(formProfile.selectedPosition)
}

watch(
  () => formProfile.firstName,
  (newValue) => {
    formProfile.firstName = newValue.trim()
  }
)

watch(
  () => formProfile.lastName,
  (newValue) => {
    formProfile.lastName = newValue.trim()
  }
)

watchEffect(() => {
  fetchUserData()
})

onBeforeMount(async () => {
  await fetchSelectsData()
})
</script>

<style scoped></style>

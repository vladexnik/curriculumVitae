<template>
  <div
    v-if="userData?.profile"
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 pb-8"
  >
    <div class="my-8 flex items-center justify-center gap-10">
      <div class="relative h-[120px] w-[120px]">
        <Avatar
          v-if="!userData.profile.avatar"
          label="V"
          class="text-bgColor"
          style="
            background-color: var(--color-primary);
            height: 120px;
            width: 120px;
          "
          size="xlarge"
          shape="circle"
        />
        <Avatar
          v-else
          :image="userData.profile.avatar"
          shape="circle"
          style="height: 120px; width: 120px"
        />
        <i
          v-if="userData.profile.avatar && !isDisabled"
          @click.prevent="handleDeleteAvatar"
          class="pi pi-times absolute left-28 top-[-140px] cursor-pointer rounded-2xl p-2 text-textMain duration-300 hover:bg-optionHover"
          style="font-size: 1rem"
          v-ripple
        ></i>
      </div>
      <label
        v-if="!isDisabled"
        class="mb-10 cursor-pointer"
        for="upload"
        @drop.prevent="handleDrop"
        @dragover.prevent
        @dragleave.prevent
      >
        <div class="flex items-center gap-3">
          <i
            class="pi pi-upload rounded-2xl p-2 text-textMain"
            style="font-size: 1rem"
          ></i>
          <span class="text-xl font-medium text-textMain">
            Upload avatar image
          </span>
        </div>

        <p class="text-textSec">png, jpg or gif no more than 0.5MB</p>
        <input
          id="upload"
          type="file"
          size="524288"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          class="hidden h-5"
          @change="handleFileUpload"
          :disabled="isDisabled"
        />
      </label>
      <Toast />
    </div>
    <div class="mb-16 flex flex-col items-center">
      <h2 class="text-textMain">{{ userData.profile.full_name }}</h2>
      <p class="mt-2 text-textSec">{{ userData.email }}</p>
      <p class="text-textMain">
        A member since
        {{ formatedDate }}
      </p>
    </div>

    <form
      v-if="userData?.profile"
      class="pointer-events-auto grid grid-cols-2 gap-x-8 gap-y-8"
    >
      <TextField
        v-model.trim="formProfile.firstName"
        type="text"
        :disabled="isDisabled"
      >
        First Name
      </TextField>
      <TextField
        v-model.trim="formProfile.lastName"
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
        :disabled="disabledBtn"
      >
        Update
      </Button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui-kit/Button.vue'
import TextField from '@/components/ui-kit/TextField.vue'
import SelectComp, { type Option } from '@/components/ui-kit/SelectComp.vue'
import Avatar from 'primevue/avatar'
import {
  getAllDepartments,
  getAllPositions,
  updateProfileInput,
  updateUserInput,
  deleteAvatar,
  uploadAvatar
} from '@/service/profile'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils'
import { getUserData } from '@/service/userData'
import type { Department, UploadAvatarInput } from 'cv-graphql'
import { useToast } from 'primevue/usetoast'

const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const userId = computed(() => userStore.authedUser?.id)
const userData = ref<any>(null)
const toast = useToast()

const formatedDate = computed(() =>
  userData.value ? formatDate(userData.value.created_at) : null
)

const departments = ref<Department[]>([])
const positions = ref<Department[]>([])
const isDisabled = ref(false)

const formProfile = reactive({
  selectedDepartment: null as Department | null,
  selectedPosition: null as Department | null,
  firstName: '',
  lastName: ''
})

const disabledBtn = computed(() => {
  if (!userData.value) {
    return false
  }
  const bool =
    formProfile.firstName === userData.value.profile.first_name &&
    formProfile.lastName === userData.value.profile.last_name &&
    formProfile.selectedDepartment?.name == userData.value.department_name &&
    formProfile.selectedPosition?.name == userData.value.position_name
      ? true
      : false
  return bool
})

const showError = () => {
  toast.add({
    severity: 'error',
    summary: 'Error Message',
    detail: 'Failed to fetch image',
    life: 3000
  })
}

const showSuccessUpload = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Image was uploaded',
    life: 3000
  })
}

const showProfileUpdate = () => {
  toast.add({
    severity: 'success',
    summary: 'Success Message',
    detail: 'Profile was updated',
    life: 3000
  })
}

const handleFileUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    processFile(input.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    processFile(event.dataTransfer.files[0])
  }
}

const processFile = (file: File) => {
  const reader = new FileReader()
  reader.onload = () => {
    const base64 = reader.result as string
    const size = file.size
    const type = file.type
    uploadImage({
      userId: userId.value,
      base64,
      size,
      type
    })
  }
  reader.readAsDataURL(file)
}

const uploadImage = async (data: UploadAvatarInput) => {
  try {
    const imageString = await uploadAvatar(data)
    userStore.authedUser = {
      ...userStore.authedUser,
      profile: {
        ...userStore.authedUser?.profile,
        avatar: imageString
      }
    }
    if (imageString) {
      showSuccessUpload()
    }
  } catch (e) {
    console.log(e)
    showError()
  }
}

const handleDeleteAvatar = async () => {
  await deleteAvatar({
    userId: userId.value
  })

  userStore.authedUser = {
    ...userStore.authedUser,
    profile: {
      ...userStore.authedUser?.profile,
      avatar: null
    }
  }
}

const setAllFieldsData = async () => {
  try {
    if (id.value && userId.value && id.value !== userId.value) {
      console.log('another user think')
      userData.value = await getUserData(id.value)
      isDisabled.value = true
    } else {
      console.log('same user think')
      userData.value = userStore.authedUser
      isDisabled.value = false
    }
    setSelectValues()
    setTextFieldsValues()
  } catch (e) {
    console.error('Error fetching user data:', e)
  }
}

const setTextFieldsValues = () => {
  if (userData.value?.profile) {
    formProfile.firstName = userData.value.profile.first_name
    formProfile.lastName = userData.value.profile.last_name
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
  } catch (e) {
    console.log('Error fetching departments and positions:', e)
  }
}

const updateProfile = async () => {
  try {
    const updatedProfile = await updateProfileInput({
      userId: userId.value,
      first_name: formProfile.firstName,
      last_name: formProfile.lastName
    })

    const updatedUser = await updateUserInput({
      userId: userId.value,
      departmentId: formProfile.selectedDepartment?.id || '',
      positionId: formProfile.selectedPosition?.id || ''
    })

    userStore.updateUserProfile(updatedUser, updatedProfile)
    showProfileUpdate()
  } catch (e) {
    console.log(e)
  }
}

onBeforeMount(() => {
  fetchSelectsData()
    .then(() => {
      setAllFieldsData()
    })
    .catch((error) => console.error(error))
})

watchEffect(() => {
  if (userData.value) {
    setAllFieldsData()
  }
})
</script>

<style scoped></style>

<template>
  <div
    v-if="userData?.profile"
    class="mx-auto flex w-full max-w-[900px] flex-col justify-center px-6 pb-8"
  >
    <div class="my-8 flex items-center justify-center gap-10">
      <div class="relative h-[120px] w-[120px]">
        <Avatar
          v-if="!userData.profile.avatar"
          :label="
            userData.profile.first_name?.charAt(0) || userData.email.charAt(0)
          "
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
              {{ t('uploadAvatar')}}
          </span>
        </div>

        <p class="text-textSec"> {{ t('uploadText')}}</p>
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
        {{ t('memberSince')}}
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
      {{ t('firstName')}}
      </TextField>
      <TextField
        v-model.trim="formProfile.lastName"
        type="text"
        :disabled="isDisabled"
      >
      {{ t('lastName')}}
      </TextField>
      <SelectComp
        v-model="formProfile.selectedDepartment"
        :options="departments"
        :placeholder="t('department')"
        :disabled="isDisabled"
      />
      <SelectComp
        v-model="formProfile.selectedPosition"
        :options="positions"
        :placeholder="t('position')"
        :disabled="isDisabled"
      />
      <Button
        v-if="!isDisabled"
        class="col-start-2 col-end-3"
        variant="contained"
        color="primary"
        @click.prevent="updateProfile"
        :disabled="isDisabledBtn"
      >
        {{ t('update')}}
      </Button>
    </form>
  </div>
</template>
<script setup lang="ts">
import { computed, onBeforeMount, reactive, ref, watchEffect } from 'vue'
import { useUserStore } from '@/stores/user'
import Button from '@/components/ui-kit/Button.vue'
import TextField from '@/components/ui-kit/TextField.vue'
import SelectComp from '@/components/ui-kit/SelectComp.vue'
import Avatar from 'primevue/avatar'
import {
  getAllDepartments,
  getAllPositions,
  updateProfileInput,
  deleteAvatar,
  uploadAvatar,
  updateUserSelects
} from '@/service/profile'
import { useRoute } from 'vue-router'
import { formatDate } from '@/utils'
import { getBaseUserData } from '@/service/userData'
import type { Department, UploadAvatarInput } from 'cv-graphql'
import { useToastNotifications } from '@/composables/useToast'
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
import type {
  UpdateProfileInputsT,
  UpdateUserPosDepT,
  userAuthedT
} from '@/models/models'

const userStore = useUserStore()
const route = useRoute()
const id = computed(() => route.params.id as string)
const userId = computed(() => userStore.authedUser?.id)
const userData = ref<userAuthedT | undefined | null>(null)
const departments = ref<Department[]>([])
const positions = ref<Department[]>([])
const isDisabled = ref(false)

const { showError, showSuccessUpload, showProfileUpdate, showInfo } =
  useToastNotifications()

const formatedDate = computed(() =>
  userData.value ? formatDate(userData.value.created_at) : null
)

const formProfile = reactive({
  selectedDepartment: null as Department | null,
  selectedPosition: null as Department | null,
  firstName: '',
  lastName: ''
})

const isDisabledBtn = computed(() => {
  if (!userData.value) {
    return false
  }
  const bool =
    formProfile.firstName === userData.value.profile.first_name &&
    formProfile.lastName === userData.value.profile.last_name &&
    formProfile.selectedDepartment?.name == userData.value.department_name &&
    formProfile.selectedPosition?.name == userData.value.position_name

  return bool
})

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
  showInfo('Image is uploading...')
  const reader = new FileReader()
  reader.onload = () => {
    const base64 = reader.result as string
    const size = file.size
    const type = file.type
    uploadImage({
      userId: userId.value || '',
      base64,
      size,
      type
    })
  }
  reader.readAsDataURL(file)
}

const handleDeleteAvatar = async () => {
  try {
    await deleteAvatar({
      userId: userId.value || ''
    })

    if (userStore.authedUser) {
      userStore.authedUser = {
        ...userStore.authedUser,
        profile: {
          ...userStore.authedUser?.profile,
          avatar: null
        }
      }
    }
    showInfo('Image was deleted')
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const setAllFieldsData = async () => {
  if (userData.value && id.value !== userId.value) return
  try {
    if (id.value && id.value !== userId.value) {
      userData.value = await getBaseUserData(id.value)
      isDisabled.value = true
    } else {
      userData.value = userStore.authedUser
      isDisabled.value = false
    }
    setSelectValues()
    setTextFieldsValues()
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const setTextFieldsValues = () => {
  if (userData.value?.profile) {
    formProfile.firstName = userData.value.profile.first_name || ''
    formProfile.lastName = userData.value.profile.last_name || ''
  }
}

const setSelectValues = () => {
  if (userData.value && departments.value.length && positions.value.length) {
    formProfile.selectedDepartment =
      departments.value.find(
        (department) => department.name === userData.value?.department_name
      ) || null
    formProfile.selectedPosition =
      positions.value.find(
        (position) => position.name === userData.value?.position_name
      ) || null
  }
}

const fetchSelectsData = async () => {
  if (departments.value.length > 0 && positions.value.length > 0) return
  try {
    const [departmentsData, positionsData] = await Promise.all([
      getAllDepartments(),
      getAllPositions()
    ])

    departments.value = [
      { name: 'No department', id: '', created_at: '' },
      ...departmentsData
    ]
    positions.value = [
      { name: 'No position', id: '', created_at: '' },
      ...positionsData
    ]
  } catch (e: unknown) {
    if (e instanceof Error) {
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const updateProfile = async () => {
  try {
    const updatedProfile: UpdateProfileInputsT = await updateProfileInput({
      userId: userId.value || '',
      first_name: formProfile.firstName,
      last_name: formProfile.lastName
    })
    const updatedUser: UpdateUserPosDepT = await updateUserSelects({
      userId: userId.value || '',
      departmentId: formProfile.selectedDepartment?.id || '',
      positionId: formProfile.selectedPosition?.id || ''
    })

    if (userStore.authedUser) {
      userStore.authedUser = {
        ...userStore.authedUser,
        department_name: updatedUser.department_name || null,
        position_name: updatedUser.position_name || null,
        profile: {
          ...userStore.authedUser?.profile,
          first_name: updatedProfile.first_name,
          last_name: updatedProfile.last_name,
          full_name: `${updatedProfile.first_name} ${updatedProfile.last_name}`
        }
      }
    }
    showProfileUpdate()
  } catch (e: unknown) {
    console.dir(e)
    if (e instanceof Error) {
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

const uploadImage = async (data: UploadAvatarInput) => {
  try {
    const imageString = await uploadAvatar(data)
    if (userStore.authedUser) {
      userStore.authedUser = {
        ...userStore.authedUser,
        profile: {
          ...userStore.authedUser?.profile,
          avatar: imageString
        }
      }
    }
    if (imageString) {
      showSuccessUpload()
    }
  } catch (e) {
    if (e instanceof Error) {
      console.dir(e)
      showError(e.message)
    } else {
      showError('An unknown error occurred. Try to reload the page')
    }
  }
}

onBeforeMount(async () => {
  try {
    await fetchSelectsData()
    await setAllFieldsData()
  } catch (error) {
    showError()
    console.error(error)
  }
})

watchEffect(() => {
  if (userData.value) {
    setAllFieldsData()
  }
})
</script>

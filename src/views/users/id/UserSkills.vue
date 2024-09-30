<template>
  <div
    v-for="(element, idx) in uiData"
    :key="idx"
    class="ml-auto mr-auto mt-8 max-w-4xl justify-center gap-4 px-6"
  >
    <div>{{ element.category }}</div>
    <div class="mt-2 flex flex-wrap pl-14">
      <div class="mx-2 mt-6 min-w-56" v-for="el in element.skills" :key="el.id">
        <Button
          variant="text"
          color="secondary"
          @click="(e) => invokeUpdateModal(e, el)"
          :disable="!enableEditMode"
        >
          <div class="inline-flex gap-4">
            <div class="pt-4" v-if="el.mastery">
              <ProgressBar
                :value="getValueForMastery(el)"
                :style="getProgressBarStyle(el)"
              >
                {{ '' }}
              </ProgressBar>
              <span class="opacity-0">{{ el.mastery }}</span>
            </div>
            <div class="pt-2">{{ el.name }}</div>
          </div>
        </Button>
      </div>
    </div>
  </div>
  <ButtonBlock
    v-if="enableEditMode"
    name="Skill"
    @openAddModal="invokeAddModal"
    @addToDelete="handlerToDelete"
    :deleteLength="arrayToDelete.length"
    @delete="deleteObj"
  />
  <AddUpdateModal
    name="Skill"
    :type="type"
    :commonData="reworkedData"
    :commonProficiency="skillsProficiency"
    :dataToUpdate="dataToUpdate"
    :grouped="type === HEADER_TYPES.ADD"
    v-model="openModal"
    @cancel="cancel"
    @confirm="updateCreateSkill"
  />

  <Toast />
</template>

<script setup lang="ts">
import ButtonBlock from '@/components/ui-kit/ButtonBlock.vue'
import ProgressBar from 'primevue/progressbar'
import Button from '@/components/ui-kit/Button.vue'
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue'
import { useSkillsStore } from '@/stores/skills'
import { useUserStore } from '@/stores/user'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useToastNotifications } from '@/composables/useToast'
import { HEADER_TYPES } from '@/components/ui-kit/constants/constants'

enum Mastery {
  Novice = 20,
  Advanced = 40,
  Competent = 60,
  Proficient = 80,
  Expert = 100
}

const masteryColorMap = {
  [Mastery.Novice]: 'blue',
  [Mastery.Advanced]: 'blue',
  [Mastery.Competent]: 'green',
  [Mastery.Proficient]: 'yellow',
  [Mastery.Expert]: 'red'
}

const { showError, showSuccessUpload, showProfileUpdate } =
  useToastNotifications()

const type = ref(HEADER_TYPES.ADD)
const openModal = ref(false)

const addToDelete = ref(false)
const arrayToDelete = ref([])

const handlerToDelete = (value) => {
  addToDelete.value = value
  if (!value) arrayToDelete.value = []
}

const deleteObj = async () => {
  const newArr = arrayToDelete.value.map((el) => ({
    userId: currentUserId.value,
    name: el?.name
  }))

  let lastResponse = null

  for (let idx = 0; idx < newArr.length; idx++) {
    const el = newArr[idx]
    try {
      lastResponse = await deleteProfileSkill(el)
    } catch (error) {
      console.error(error)
      showError()
    }
  }

  if (lastResponse) {
    currentUserSkills.value = lastResponse.skills
    showProfileUpdate('Succesfully deleted')

    await getData()
  }

  handlerToDelete(false)
}

const skillsStore = useSkillsStore()
const { skills, skillsProficiency, skillsCategories } = storeToRefs(skillsStore)
const {
  addProfileSkill,
  updateProfileSkill,
  deleteProfileSkill,
  getSkillsCategories
} = skillsStore

const userStore = useUserStore()
const { authedUser } = storeToRefs(userStore)

const route = useRoute()

const currentUserId = computed(() => {
  let arr = route.path.split('/')
  return arr[arr.length - 2]
})

const enableEditMode = computed(
  () => authedUser?.value?.id == currentUserId?.value
)

const currentUserSkills = ref()
const { getSkillListByUserId } = skillsStore

const skillCategoryMap = computed(() =>
  skillsCategories.value.reduce((acc, cat) => {
    acc[cat.name] = cat.id
    return acc
  }, {})
)

const getCategoryId = (skill) =>
  skillCategoryMap.value[skill.type] ?? skillCategoryMap.value[skill.category]

const updateCreateSkill = async (data) => {
  const newObj = {
    userId: currentUserId.value,
    name: data.capability.value.name,
    mastery: data.levelProficiency.value.name,
    categoryId: getCategoryId(data.capability.value)
  }

  try {
    const response = type.value === HEADER_TYPES.ADD
      ? await addProfileSkill(newObj)
      : await updateProfileSkill(newObj)
    if (response) {
      showSuccessUpload(type.value === HEADER_TYPES.ADD
        ? 'New Skill was successfully added'
        : 'Data was successfully updated')
      currentUserSkills.value = response.skills
    }
  } catch (e) {
    console.error(e)
    showError()
  }
}

const dataToUpdate = ref()

const invokeUpdateModal = (info) => {
  if (!addToDelete.value) {
    openModal.value = true
    type.value = HEADER_TYPES.UPDATE
    dataToUpdate.value = { capability: info.name, levelProficiency: info.mastery }
  } else {
    arrayToDelete.value = arrayToDelete.value.toggle(info)
  }
}

const invokeAddModal = () => {
  dataToUpdate.value = {}
  openModal.value = true
  type.value = HEADER_TYPES.ADD
}

const cancel = () => {
  openModal.value = false
  dataToUpdate.value = {}
}

const getProgressBarStyle = (el) => ({
  '--progress-bar-fill-color': arrayToDelete.value.includes(el) ? 'grey' : masteryColorMap[el.mastery],
})

const getValueForMastery = (el) => (arrayToDelete.value.includes(el) ? 0 : Mastery[el.mastery]);

const updateReworkedData = () => {
  if (currentUserSkills?.value) {
    const arr = currentUserSkills?.value?.map((skill) => skill.name)
    return type.value === HEADER_TYPES.ADD
      ? skills.value?.filter((skill) => !arr.includes(skill.name))
      : skills.value
  }
}

const reworkedData = computed(() => updateReworkedData())

const updateUISKillsData = () => {
  if (!currentUserSkills.value || !skillsCategories.value) {
    console.error('Skills or categories are not loaded.')
    return
  }

  const categoryMap = skillsCategories.value.reduce((map, cat) => {
    map[cat.id] = cat.name
    return map
  }, {} as Record<number, string>)

  const result: { category: string; skills: typeof currentUserSkills.value[number][] }[] = []

  currentUserSkills.value.forEach((skill) => {
    const category = categoryMap[skill.categoryId] || 'Others'
    const categoryGroup = result.find((group) => group.category === category)
    if (categoryGroup) {
      categoryGroup.skills.push(skill)
    } else {
      result.push({ category, skills: [skill] })
    }
  })

  uiData.value = result
}

const uiData = ref()

const getData = async () => {
  const [skills, categories] = await Promise.all([
    getSkillListByUserId(currentUserId.value),
    getSkillsCategories(),
  ])
  currentUserSkills.value = skills
  skillsCategories.value = categories
  updateUISKillsData()
  return { skills, categories }
}

onMounted(async () => {
  await getData()
})
</script>
<style>
.p-progressbar-value {
  background: var(--progress-bar-fill-color) !important;
}
.p-progressbar {
  @apply !h-1;
}
</style>

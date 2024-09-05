<template>
  <div class="max-w-4xl flex flex-wrap justify-center mt-5 ml-auto mr-auto gap-4 px-6">
    <div class="min-w-56" v-for="el in currentUserSkills" :key="el.id">
      <Button variant="text" color="secondary" @click="(e) => invokeUpdateModal(e, el)" :disable="!enableEditMode">
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
          <div class="pt-2" >{{ el.name }}</div>
        </div>
      </Button>
    </div>
  </div>
  <ButtonBlock v-if="enableEditMode" name="Skill" @openAddModal="invokeAddModal" @addToDelete="handlerToDelete" :deleteLength="arrayToDelete.length" @delete="deleteObj"/>
  <AddUpdateModal 
    name="Skill" 
    :type="type" 
    :commonData="reworkedData" 
    :commonProficiency="skillsProficiency"
    :dataToUpdate="dataToUpdate" 
    :grouped="type==='Add'"
    v-model="openModal"
    @cancel="cancel"
    @confirm="updateCreateSkill"
  />

  <Toast />
</template>

<script setup lang="ts">
import ButtonBlock from '@/components/ui-kit/ButtonBlock.vue';
import ProgressBar from 'primevue/progressbar';
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue';
import { useSkillsStore } from '@/stores/skills';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';
import { useToastNotifications } from '@/composables/useToast'


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
};

const { showError, showSuccessUpload, showProfileUpdate } =
  useToastNotifications()

const type = ref('Add')
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
  }));

  let lastResponse = null;

  for (let idx = 0; idx < newArr.length; idx++) {
    const el = newArr[idx];
    try {
      lastResponse = await deleteProfileSkill(el);
    } catch (error) {
      console.error(error);
      showError()
    }
  }

  if (lastResponse) {
    currentUserSkills.value = lastResponse.skills;
    showProfileUpdate('Succesfully deleted');
  }

  handlerToDelete(false);
};

const skillsStore = useSkillsStore();
const { skills, skillsProficiency } = storeToRefs(skillsStore);
const { 
    addProfileSkill,
    updateProfileSkill,
    deleteProfileSkill
  } = skillsStore;

const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

const route = useRoute();

const currentUserId = computed(() => {
  let arr = route.path.split('/');
  return arr[arr.length - 2];
});

const enableEditMode = computed(() => authedUser?.value?.id == currentUserId?.value);

const currentUserSkills = ref();
const { getSkillListByUserId } = skillsStore;

const updateCreateSkill = async (data) => {
  try {
    const newObj = {
      userId: currentUserId.value,
      name: data.field1.value.name,
      mastery: data.field2.value.name
    }
    let response
    if (type.value === 'Add') {
      response = await addProfileSkill(newObj);
      if (response) showSuccessUpload('New Skill was succesfully added')
    }  else {
      response = await updateProfileSkill(newObj);
      if (response) showProfileUpdate('Data was succesfully updated')
    }
    currentUserSkills.value = response.skills
  } catch (e) {
    console.log(e)
    showError()
  }
}

const dataToUpdate = ref();

const invokeUpdateModal = (_, info) => {
  if (!addToDelete.value) {
    openModal.value = true;
    type.value = 'Update';
    dataToUpdate.value = {
      field1: info.name,
      field2: info.mastery
    };
  } else {
    if (arrayToDelete.value.includes(info)) {
      arrayToDelete.value = arrayToDelete.value.filter(el => el !== info)
    } else {
      arrayToDelete.value.push(info)
    }
  }
};

const invokeAddModal = () => {
  dataToUpdate.value = {}
  openModal.value = true;
  type.value = 'Add';
}

const cancel = () => {
  openModal.value = false;
  dataToUpdate.value = {};
}

const getProgressBarStyle = (el) => {
  const color = arrayToDelete.value.includes(el) ? 'grey': masteryColorMap[Mastery[el.mastery as keyof typeof Mastery]];
  return {
    '--progress-bar-fill-color': color,
  };
};

const getValueForMastery = (el) => {
  return arrayToDelete.value.includes(el) ? 0 : Mastery[el.mastery as keyof typeof Mastery];
};

const updateReworkedData = () => {
  if (currentUserSkills?.value) {
    const arr = currentUserSkills?.value?.map(skill => skill.name)
    return type.value === 'Add' ? skills.value?.filter(skill => !arr.includes(skill.name)) : skills.value;
  }
}
const reworkedData = computed(() => updateReworkedData())

onMounted(async () => {
  const data = await getSkillListByUserId(currentUserId.value);
  currentUserSkills.value = data;
});
</script>
<style>
.p-progressbar-value {
  background: var(--progress-bar-fill-color) !important;
}
.p-progressbar {
  @apply !h-1;
}
</style>
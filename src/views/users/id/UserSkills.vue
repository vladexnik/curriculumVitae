<template>
  <div class="max-w-4xl flex flex-wrap justify-center mt-5 ml-auto mr-auto gap-4 px-6">
    <div class="min-w-56" v-for="el in currentUserSkills" :key="el.id">
      <Button variant="text" color="secondary" @click="(e) => invokeModal(e, el)" :disable="!enableEditMode">
        <div class="inline-flex gap-4">
          <div class="pt-4" v-if="el.mastery">
            <ProgressBar 
             :value="getValueForMastery(el.mastery)"
             :style="getProgressBarStyle(el.mastery)"
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
  
  <AddUpdateModal 
    name="Skill" 
    :type="type" 
    :commonData="skills" 
    :commonProficiency="skillsProficiency"
    :dataToUpdate="dataToUpdate" 
    v-model="openModal"
    @cancel="() => (openModal = false)"
    @confirm="updateCreateSkill"
  />
</template>

<script setup lang="ts">
import ProgressBar from 'primevue/progressbar';
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue';
import { useSkillsStore } from '@/stores/skills';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router';

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

const type = ref('Add')
const openModal = ref(false)

const skillsStore = useSkillsStore();
const { skills, skillsProficiency } = storeToRefs(skillsStore);

const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

const route = useRoute();

const currentUserId = computed(() => {
  let arr = route.path.split('/');
  return arr[arr.length - 2];
});

const enableEditMode = computed(() => authedUser.value.id == currentUserId.value);

const currentUserSkills = ref();
const { getSkillListByUserId } = skillsStore;

const updateCreateSkill = (data) => {
  console.log("skill", type.value, data)
}

const dataToUpdate = computed(() => {
  return {
    field1: { id: "1", name: "Python" },
    field2: { id: "0", name: "Novice" }
  };
});

const invokeModal = (_, info) => {
  openModal.value = true;
  type.value = 'Update';
  dataToUpdate.value = {
    field1: { name: info.name },
    field2: { name: info.mastery }
  };
  console.log('skill', info);
};

const getProgressBarStyle = (mastery) => {
  const color = masteryColorMap[Mastery[mastery as keyof typeof Mastery]];
  return {
    '--progress-bar-fill-color': color,
  };
};

const getValueForMastery = (mastery) => {
  return Mastery[mastery as keyof typeof Mastery];
};

onMounted(async () => {
  const data = await getSkillListByUserId(currentUserId.value);
  currentUserSkills.value = data;
});
</script>
<style>
/* Применение стиля к заливной части прогресс-бара */
.p-progressbar-value {
  background: var(--progress-bar-fill-color) !important;
}
.p-progressbar {
  @apply !h-1;
}
</style>
<template>
  <div class="max-w-4xl flex flex-wrap justify-center mt-5 ml-auto mr-auto gap-4 px-6 ">
  <div class="min-w-56" v-for="el in currentUserSkills" :key="el.id">
    <Button variant="text" color="secondary" @click="(e) => invokeModal(e, el)" :disable="!enableEditMode">
      <div class="inline-flex gap-4">
      <div :class="{
        'blue': el.mastery.toLowerCase() === 'advanced',
        'green': el.mastery.toLowerCase() === 'competent',
        'yellow': el.mastery.toLowerCase() === 'proficient',
        'red': el.mastery.toLowerCase() === 'expert',
      }
      ">{{el.mastery}}</div>
      <div>{{ el.name }}</div>
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
import Button from '@/components/ui-kit/Button.vue';
import AddUpdateModal from '@/components/ui-kit/AddUpdateModal.vue';
import { useSkillsStore } from '@/stores/skills';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted } from 'vue'

import { useRoute } from 'vue-router';

const route = useRoute();

// enum Type {
//   Add,
//   Update
// }
const type = ref('Add')
const openModal = ref(false)

const skillsStore = useSkillsStore();
const { skills, skillsProficiency } = storeToRefs(skillsStore);

const userStore = useUserStore();
const { authedUser } = storeToRefs(userStore);

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
  const obj = {
    field1: {
      id: "1",
      name: "Python"    },
    field2: {  id: "0", name: "Novice" }
  }
  return obj;
})

const invokeModal = (_, info) => {
  openModal.value = true;
  type.value = 'Update';
  dataToUpdate.value = {
    field1: { name: info.name},
    field2: { name: info.mastery},
  }
}

onMounted(async () => {
  const data = await getSkillListByUserId(currentUserId.value);
  currentUserSkills.value = data;
})
</script>
<style scoped>
.blue {
  color: rgb(2, 136, 209);
}
.green {
  color: rgb(46, 125, 50);
}
.yellow {
  color: rgb(255, 184, 0);
}
.red {
  color: rgb(198, 48, 49);
}
</style>

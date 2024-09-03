<template>
  <div class="about">
    <h1>{{
      skillsProficiency}}</h1>
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
import AddUpdateModal from '@/components/AddUpdateModal.vue';
import { useSkillsStore } from '@/stores/skills';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue'
// enum Type {
//   Add,
//   Update
// }
const type = ref('Add')
const openModal = ref(false)

const skillsStore = useSkillsStore();
const { skills, skillsProficiency } = storeToRefs(skillsStore);

const updateCreateSkill = (data) => {
  console.log("skill", type.value, data)
}

const dataToUpdate = computed(() => {
  const obj = {
    field1: {

    },
    filed2: {

    }
  }
  return obj;
})

</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

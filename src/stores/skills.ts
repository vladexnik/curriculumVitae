import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSkills } from '@/service/commonData'

  interface DataRow {
    id: string,
    name: string,
    category: string,
  }

export const useSkillsStore = defineStore('skills', () => {

  const skills = ref<DataRow[]>();

  const getSkillsList = async () => {
    const data = await getSkills();
    if (data) {
      skills.value = data.skills.map(skill => {
        return {
          id: skill.id,
          name: skill.name,
          category: skill.category,
        }
      })
    }
  }
  
  onMounted(async() => {
    if (!skills.value) await getSkillsList();
  })
  return {
    skills
  }
})
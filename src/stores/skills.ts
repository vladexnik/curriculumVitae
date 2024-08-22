import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSkills } from '@/service/commonData'

  interface DataRow {
    id: string,
    name: string,
    type: string,
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
          type: skill.category_parent_name,
          category: skill.category_name,
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
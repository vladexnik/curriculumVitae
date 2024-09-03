import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSkills } from '@/service/commonData'
import { getUserData } from '@/service/userData'
  
interface DataRow {
    id: string,
    name: string,
    type: string,
    category: string,
  }

  enum Mastery {
    Novice,
    Advanced,
    Competent,
    Proficient,
    Expert,
  }

export const useSkillsStore = defineStore('skills', () => {

  const skills = ref<DataRow[]>();
  const skillsProficiency = ref(Object.values(Mastery).filter(el => (typeof el == 'string')));

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

  const getSkillListByUserId = async (userId) => {
    const data = await getUserData(userId);
    if (data) {
      const skillArr = data.profile.skills
      return skillArr;
    }
  }
  
  onMounted(async() => {
    if (!skills.value) await getSkillsList();
  })
  return {
    skills,
    skillsProficiency,
    getSkillListByUserId
  }
})
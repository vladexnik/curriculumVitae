import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getSkills, addSkill, updateSkill, deleteSkill } from '@/service/commonData'
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

  const addProfileSkill= async (obj) => {
    const data = await addSkill(obj);
    if (data) {
      return data.addProfileSkill;
    }
  }

  const updateProfileSkill= async (obj) => {
    const data = await updateSkill(obj);
    if (data) {
      return data.updateProfileSkill;
    }
  }

  const deleteProfileSkill = async (obj) => {
      const data = await deleteSkill(obj);
      if (data) {
        console.log('delete Lang', data)
        return data.deleteProfileSkill;
      }
  }  
  
  onMounted(async() => {
    if (!skills.value) await getSkillsList();
  })
  return {
    skills,
    skillsProficiency,
    getSkillListByUserId,
    addProfileSkill,
    updateProfileSkill,
    deleteProfileSkill
  }
})
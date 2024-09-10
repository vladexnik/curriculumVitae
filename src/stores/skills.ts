import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  getCategories
} from '@/service/commonData'
import { getUserData } from '@/service/userData'

interface DataRow {
  id: string
  name: string
  type: string
  category: string
}

enum Mastery {
  Novice,
  Advanced,
  Competent,
  Proficient,
  Expert
}

export const useSkillsStore = defineStore('skills', () => {
  const skills = ref<DataRow[]>()
  const skillsProficiency = ref(
    Object.values(Mastery).filter((el) => typeof el == 'string')
  )
  const skillsCategories = ref()

  const getSkillsCategories = async () => {
    const data = await getCategories()
    if (data) {
      skillsCategories.value = data.skillCategories
      return skillsCategories.value
    }
  }

  const getSkillsList = async () => {
    const data = await getSkills()
    if (data) {
      skills.value = data.skills.map((skill) => {
        return {
          id: skill.id,
          name: skill.name,
          type: skill.category_parent_name,
          category: skill.category_name
        }
      })
    }
  }

  const getSkillListByUserId = async (userId) => {
    const data = await getUserData(userId)
    if (data) {
      const skillArr = data.profile.skills
      return skillArr
    }
  }

  const addProfileSkill = async (obj) => {
    const data = await addSkill(obj)
    if (data) {
      return data.addProfileSkill
    }
  }

  const updateProfileSkill = async (obj) => {
    const data = await updateSkill(obj)
    if (data) {
      return data.updateProfileSkill
    }
  }

  const deleteProfileSkill = async (obj) => {
    const data = await deleteSkill(obj)
    if (data) {
      return data.deleteProfileSkill
    }
  }

  onMounted(async () => {
    if (!skills.value) await getSkillsList()
    if (!skillsCategories.value) await getSkillsCategories()
  })
  return {
    skills,
    skillsProficiency,
    skillsCategories,
    getSkillListByUserId,
    addProfileSkill,
    updateProfileSkill,
    deleteProfileSkill,
    getSkillsCategories
  }
})

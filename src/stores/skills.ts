import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
  getCategories
} from '@/service/commonData'
import {
  getCVById,
  addCvSkill,
  updateCvSkill,
  deleteCvSkill
} from '@/service/cvs'
import { getUserData } from '@/service/userData'

import { Mastery } from '@/components/ui-kit/constants/constants'

interface DataRow {
  id: string
  name: string
  type: string
  category: string
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

  const getSkillListByCVId = async (cvId) => {
    const data = await getCVById(cvId)
    if (data) {
      const res = { skills: data.skills, userId: data.user.id }
      return res
    }
  }

  const addCVSkill = async (obj) => {
    const data = await addCvSkill(obj)
    if (data) {
      return data.addCvSkill
    }
  }

  const updateCVSkill = async (obj) => {
    const data = await updateCvSkill(obj)
    if (data) {
      return data.updateCvSkill
    }
  }
  const deleteCVSkill = async (obj) => {
    const data = await deleteCvSkill(obj)
    if (data) {
      return data.deleteCvSkill
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
    getSkillsCategories,
    getSkillListByCVId,
    addCVSkill,
    updateCVSkill,
    deleteCVSkill
  }
})

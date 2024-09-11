import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import {
  getProjectsList,
  getProjectsByCvId,
  deleteProject,
  addProject,
  updateProject
} from '@/service/projectsList'

interface DataRow {
  id: string
  name: string
  domain: string
  startDate: string
  endDate: string
  description: string
  environment: string[]
}

export const useProjectsListStore = defineStore('projects', () => {
  const projects = ref<DataRow[]>()

  const getProjects = async () => {
    const data = await getProjectsList()
    if (data) {
      projects.value = data.projects.map((project) => {
        return {
          id: project.id,
          name: project.name,
          domain: project.domain,
          startDate: project.start_date,
          endDate: project.end_date,
          description: project.description,
          environment: project.environment
        }
      })
    }
    console.log(projects.value)
  }

  const getProjectsByCVId = async (cvId: string) => {
    const data = await getProjectsByCvId(cvId)
    if (data) {
      const projectsArr = data.projects.map((project) => {
        return {
          id: project.project.id,
          name: project.name,
          domain: project.domain,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
          environment: project.responsibilities
        }
      })
      return projectsArr
    }
  }

  const addProjectbyId = async (obj) => {
    const data = await addProject(obj)
    if (data) {
      const projectsArr = data.projects.map((project) => {
        return {
          id: project.project.id,
          name: project.name,
          domain: project.domain,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
          environment: project.responsibilities
        }
      })
      return projectsArr
    }
  }

  const updateProjectbyId = async (obj) => {
    const data = await updateProject(obj)
    if (data) {
      const projectsArr = data.projects.map((project) => {
        return {
          id: project.project.id,
          name: project.name,
          domain: project.domain,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
          environment: project.responsibilities
        }
      })
      return projectsArr
    }
  }

  const deleteProjectbyId = async (cvId: string, projectId: string) => {
    const data = await deleteProject(cvId, projectId)
    if (data) {
      const projectsArr = data.projects.map((project) => {
        return {
          id: project.project.id,
          name: project.name,
          domain: project.domain,
          description: project.description,
          startDate: project.start_date,
          endDate: project.end_date,
          environment: project.responsibilities
        }
      })
      return projectsArr
    }
  }

  onMounted(async () => {
    if (!projects.value) await getProjects()
  })
  return {
    projects,
    getProjectsByCVId,
    deleteProjectbyId,
    updateProjectbyId,
    addProjectbyId
  }
})

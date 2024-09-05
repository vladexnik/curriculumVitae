import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getProjectsList } from '@/service/projectsList'

interface DataRow {
  id: string
  name: string
  domain: string
  startDate: string
  endrDate: string
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
          endrDate: project.end_date,
          description: project.description,
          environment: project.environment
        }
      })
    }
    console.log(projects.value)
  }

  onMounted(async () => {
    if (!projects.value) await getProjects()
  })
  return {
    projects
  }
})

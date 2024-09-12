import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getDepartments } from '@/service/commonData'

import { useUsersListStore } from '@/stores/usersList'
import { storeToRefs } from 'pinia'

interface DataRow {
  id: string
  name: string
  employees: number
}

export const useDepartmentsStore = defineStore('departments', () => {
  const usersStore = useUsersListStore()
  const { users } = storeToRefs(usersStore)

  const departments = ref<DataRow[]>()
  const getDepartmentsList = async () => {
    const data = await getDepartments()
    if (data && users.value) {
      departments.value = data.departments.map((department) => {
        const employeesAmount = users.value?.filter(
          (user) => user['department'] === department.name
        ).length
        return {
          id: department.id,
          name: department.name,
          employees: employeesAmount
        }
      })
    }
  }

  onMounted(async () => {
    if (!departments.value) await getDepartmentsList()
  })
  return {
    departments
  }
})

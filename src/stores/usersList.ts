import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getUsersList } from '@/service/usersList'

  interface DataRow {
    id: string,
    img: string,
    firstName: string,
    lastName: string,
    email: string,
    department: string,
    position: string,
    actionButton: string
  }

export const useUsersListStore = defineStore('users', () => {

  const users = ref<DataRow[]>();

  const getUsers = async () => {
    const data = await getUsersList();
    if (data) {
      users.value = data.users.map(user => {
        return {
          id: user.id,
          img: user.profile.avatar,
          firstName: user.profile.first_name,
          lastName: user.profile.last_name,
          email: user.email,
          department: user.department_name,
          position: user.position_name,
          actionButton: ""
        }
      })
    }
  }
  
  onMounted(async() => {
    if (!users.value) await getUsers();
  })
  return {
    users
  }
})
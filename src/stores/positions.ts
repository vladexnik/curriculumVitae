import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getPositions } from '@/service/commonData'

import { useUsersListStore } from "@/stores/usersList";
import { storeToRefs } from 'pinia';

  interface DataRow {
    id: string,
    name: string,
    employees: number,
  }

export const usePositionssStore = defineStore('positions', () => {
  const usersStore = useUsersListStore();
  const { users } =  storeToRefs(usersStore);

  const positions = ref<DataRow[]>();
  const getPositionsList = async () => {
    const data = await getPositions();
    if (data && users.value) {
      positions.value = data.positions.map(post => {
        const employeesAmount = users.value?.filter(user => user['position'] === post.name).length;
        return {
          id: post.id,
          name: post.name,
          employees: employeesAmount
        }
      })
    }
  }
  
  onMounted(async() => {
    if (!positions.value) await getPositionsList();
  })
  return {
    positions
  }
})
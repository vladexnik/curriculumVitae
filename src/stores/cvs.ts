import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCVsList } from '@/service/cvs'

  interface DataRow {
    id: string,
    name: string,
    education: string,
    description: string,
    employee: string,
  }

export const useCVsStore = defineStore('cvs', () => {

  const cvs = ref<DataRow[]>();

  const getCVs = async () => {
    const data = await getCVsList();
    if (data) {
      cvs.value = data.cvs.map(cv => {
        return {
          id: cv.id,
          name: cv.name,
          education: cv.education,
          description: cv.description,
          employee: cv?.user?.email,
        }
      })
    }
  }
  
  onMounted(async() => {
    if (!cvs.value) await getCVs();
  })
  return {
    cvs
  }
})
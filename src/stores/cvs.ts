import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCVsList, deleteCV, createCV} from '@/service/cvs'
import { getUserData } from '@/service/userData'

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

  const getCVsByUserId = async (userId: string) => {
    const data = await getUserData(userId);
    if (data) {
      const cvsArr = data.user.cvs.map(cv => {
        return {
        id: cv.id,
        name: cv.name,
        education: cv.education,
        description: cv.description
      }
    })
      return cvsArr;
    }

  }

  const deleleteCVbyId = async (id: string) =>{
    const data = await deleteCV(id);
    if (data) {
      console.log('DELETED', data)
    }
  }

  const createNewCV = async (obj: unknown) =>{
    const data = await createCV(obj);
    if (data) {
      return data
    }
  }
  
  onMounted(async() => {
    if (!cvs.value) await getCVs();
  })
  return {
    cvs,
    getCVsByUserId,
    deleleteCVbyId,
    createNewCV
  }
})
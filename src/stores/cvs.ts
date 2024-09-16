
import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getCVsList, deleteCV, createCV } from '@/service/cvs'
import { getUserData } from '@/service/userData'
import type { DeleteCvInput } from 'cv-graphql'


interface DataRow {
 id: string
 name: string
 education: string
 description: string
 employee: string
 userId: string
}


export const useCVsStore = defineStore('cvs', () => {
 const cvs = ref<DataRow[]>()


 const getCVs = async () => {
   const data = await getCVsList()
   if (data) {
     cvs.value = data.cvs.map((cv) => {
       return {
         id: cv.id,
         name: cv.name,
         education: cv.education,
         description: cv.description,
         employee: cv?.user?.email,
         userId: cv?.user?.id
       }
     })
   }
 }


 const getCVsByUserId = async (userId: string) => {
   const data = await getUserData(userId)
   if (data) {
     const cvsArr = data.cvs.map((cv) => {
       return {
         id: cv.id,
         name: cv.name,
         education: cv.education,
         description: cv.description
       }
     })
     return cvsArr
   }
 }


 const deleleteCVbyId = async (id: DeleteCvInput) => {
   const data = await deleteCV(id)
   if (data) {
     console.log('DELETED', data)
   }
 }


 const createNewCV = async (obj: { name: string, description: string, education: string, userId: string}) => {
   const data = await createCV(obj)
   if (data) {
     return data
   }
 }


 onMounted(async () => {
   if (!cvs.value) await getCVs()
 })
 return {
   cvs,
   getCVsByUserId,
   deleleteCVbyId,
   createNewCV
 }
})





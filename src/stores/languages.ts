import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import { getLanguages } from '@/service/commonData'

  interface DataRow {
    id: string,
    name: string,
    nativeName: string,
    iso2: string,
  }

export const useLanguagesStore = defineStore('languages', () => {

  const languages = ref<DataRow[]>();

  const getLanguagesList = async () => {
    const data = await getLanguages();
    if (data) {
      languages.value = data.languages.map(lang => {
        return {
          id: lang.id,
          name: lang.name,
          nativeName: lang.native_name,
          iso2: lang.iso2,
        }
      })
    }
  }
  
  onMounted(async() => {
    if (!languages.value) await getLanguagesList();
  })
  return {
    languages
  }
})
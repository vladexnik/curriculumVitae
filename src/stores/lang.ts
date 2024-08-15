import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useLangStore = defineStore('lang', () => {
  const langs = ref([
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Русский', code: 'ru' }
  ])

  const selectedLang = ref(loadSavedLanguage())

  function loadSavedLanguage() {
    const savedLangCode = localStorage.getItem('language')
    return (
      langs.value.find((lang) => lang.code === savedLangCode) || langs.value[0]
    )
  }

  watch(selectedLang, (newLang) => {
    localStorage.setItem('language', newLang.code)
  })

  return {
    langs,
    selectedLang
  }
})

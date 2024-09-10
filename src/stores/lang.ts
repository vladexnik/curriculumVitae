import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { i18n } from '@/i18n' // Import i18n

export const useLangStore = defineStore('lang', () => {
  const langs = ref([
    { name: 'English', code: 'en' },
    { name: 'Deutsch', code: 'de' },
    { name: 'Русский', code: 'ru' }
  ])

  const selectedLang = ref(loadSavedLanguage())

  function loadSavedLanguage(): {name: string, code: "en" | "de" | "ru"} {
    const savedLangCode = localStorage.getItem('language')
    return (
      langs.value.find((lang) => lang.code === savedLangCode) || langs.value[0]
    )
  }

  watch(selectedLang, (newLang: {name: string, code: "en" | "de" | "ru"}) => {
    localStorage.setItem('language', newLang.code)
    i18n.global.locale = newLang.code
    selectedLang.value = newLang
  })

  return {
    langs,
    selectedLang
  }
})

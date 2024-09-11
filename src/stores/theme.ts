import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n';


export const useThemeStore = defineStore('theme', () => {
  const { t } = useI18n();
  const themes = ref([
    { name: t('light'), code: 'light' },
    { name: t('dark'), code: 'dark' },
    { name: t('deviceSettings'), code: 'device' }
  ])

  const selectedTheme = ref(loadSavedTheme() || themes.value[0])

  function preferSchemeObject() {
    const prefersDarkScheme = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches
    const defaultTheme = prefersDarkScheme ? 'dark' : 'light'
    document.documentElement.classList.add(defaultTheme)
    return themes.value[2]
  }

  function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      if (savedTheme === 'device') {
        return preferSchemeObject()
      } else {
        document.documentElement.classList.add(savedTheme)
        const savedThemeObject = themes.value.find(
          (theme) => theme.code === savedTheme
        )
        return savedThemeObject
      }
    }
    const defaultTheme = preferSchemeObject()
    return defaultTheme
  }

  watch(selectedTheme, (newTheme) => {
    document.documentElement.classList.remove('light', 'dark')

    if (newTheme.code === 'device') {
      const prefersDarkScheme = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
      const defaultTheme = prefersDarkScheme ? 'dark' : 'light'
      document.documentElement.classList.add(defaultTheme)
    } else {
      document.documentElement.classList.add(newTheme.code)
    }
    localStorage.setItem('theme', newTheme.code)
  })

  return {
    themes,
    selectedTheme
  }
})

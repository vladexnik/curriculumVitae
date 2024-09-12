import './assets/main.css'
import './input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n' // Import i18n instance
import { useLangStore } from '@/stores/lang' // Import the lang store

// Apollo client
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apollo'

import VueCookies from 'vue3-cookies'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.directive('ripple', Ripple)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  },
  ripple: true
})

app.use(router)
app.use(createPinia())
app.use(VueCookies, {
  expireTimes: '7d',
  path: '',
  domain: '',
  secure: true
})
app.use(ToastService)
app.component('Toast', Toast)

const langStore = useLangStore();
i18n.global.locale.value = langStore.selectedLang.code; 
app.use(i18n)
app.mount('#app')

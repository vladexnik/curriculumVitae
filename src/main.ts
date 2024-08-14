import './assets/main.css'
import './input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Apollo client
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apollo'

import VueCookies from 'vue3-cookies'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'

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

app.mount('#app')

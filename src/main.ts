import './assets/main.css'
import './input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'

// Apollo client
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apollo'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.directive('ripple', Ripple)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  },
  ripple: true
})
app.use(createPinia())
app.use(router)

app.mount('#app')

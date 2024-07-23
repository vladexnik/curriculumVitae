import './assets/main.css'
import './input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Ripple from 'primevue/ripple'
import App from './App.vue'
import router from './router'

const app = createApp(App)

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

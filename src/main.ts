import './assets/main.css'
import './input.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// Apollo client
import { DefaultApolloClient } from '@vue/apollo-composable'
import apolloClient from './plugins/apollo'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)
app.use(createPinia())
app.use(router)

app.mount('#app')

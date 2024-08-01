<template>
  <form
    @submit.prevent="handleAuth"
    class="flex h-[calc(100%-66px)] flex-col items-center justify-center"
  >
    <p class="mb-6 text-3xl">{{ obj.title }}</p>
    <p class="mb-10">{{ obj.subtitle }}</p>
    <div class="flex w-[90%] max-w-[560px] flex-col gap-4">
      <TextField type="text" v-model="auth.email" autocomplete="email">
        Email
      </TextField>
      <TextField
        type="password"
        v-model="auth.password"
        autocomplete="current-password"
      >
        Password
      </TextField>
    </div>
    <div class="mt-[60px] flex w-[220px] flex-col gap-2">
      <Button variant="contained" color="primary" type="submit">
        {{ obj.action }}
      </Button>
      <Button
        variant="text"
        color="primary"
        type="submit"
        @click.prevent="$router.push(obj.link)"
      >
        {{ obj.actionRedirect }}
      </Button>
    </div>
  </form>
</template>
<script setup lang="ts">
import TextField from '@/components/ui-kit/TextField.vue'
import Button from '@/components/ui-kit/Button.vue'
import { reactive } from 'vue'
import { useApolloClient } from '@vue/apollo-composable'
import { LOGIN_QUERY } from '@/graphQL'
import { useRoute } from 'vue-router'

const route = useRoute()
const auth = reactive({
  email: '',
  password: ''
})

defineProps<{
  obj: {
    title: string
    subtitle: string
    action: string
    actionRedirect: string
    link: string
  }
}>()

const { client } = useApolloClient()

const handleSubmitLogin = async () => {
  try {
    const { data, errors } = await client.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      }
    })

    if (errors) {
      console.error('Error during login:', errors)
    } else {
      console.log('Login successful', data.login)
    }
  } catch (e) {
    console.error('Unexpected error during login:', e)
  }
}

const handleSubmitSignUp = () => {
  console.log('signup')
}

const handleAuth = () =>
  route.path === '/auth/login' ? handleSubmitLogin() : handleSubmitSignUp()
</script>

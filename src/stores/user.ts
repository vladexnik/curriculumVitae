import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP } from '../graphQL/index'
import type { AuthInput } from 'cv-graphql'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref('')

  const login = async (auth: AuthInput) => {
    console.log('FORM', auth)
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      }
    })
    accessToken.value = data.login.access_token
    authedUser.value = data.login.user
    console.log('RESULT', data)
  }

  const signup = async (auth: AuthInput) => {
    console.log('auth', auth)
    const { data } = await apolloClient.mutate({
      mutation: SIGNUP,
      variables: {
        auth
      }
    })
    accessToken.value = data.signup.access_token
    authedUser.value = data.signup.user
    console.log('RESULT', data)
  }

  return { accessToken, login, signup }
})

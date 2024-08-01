import { ref } from 'vue'
import { defineStore } from 'pinia'
import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP } from '../graphQL/index'
import type { AuthInput } from 'cv-graphql'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref('')

  const login = async (auth: AuthInput) => {
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      },
      fetchPolicy: 'no-cache'
    })
    console.log(data)
    accessToken.value = data.access_token
    authedUser.value = data.user
  }

  const signup = async (email: String, password: String) => {
    const auth = { email, password }
    await apolloClient.mutate({
      mutation: SIGNUP,
      variables: {
        auth
      }
    })
  }

  return { accessToken, login, signup }
})

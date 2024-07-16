import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP } from '../graphQL/index'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref()

  const login = async () => {
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      fetchPolicy: 'no-cache'
    })
    accessToken.value = data.access_token
    authedUser.value = data.user
  }

  const signup = async (email: String, password: String) => {
    const auth = { email, password };
    await apolloClient.mutate({
      mutation: SIGNUP,
      variables: {
        auth
      }
    })
    await login()
  }



  return { accessToken, login, signup }
})

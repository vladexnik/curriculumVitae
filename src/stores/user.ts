import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthInput } from 'cv-graphql'
import { useCookies } from 'vue3-cookies'

import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP, UPDATE_ACCESS_TOKEN } from '../graphQL/index'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref('')
  const isAuthed = ref(false)

  const login = async (auth: AuthInput) => {
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      }
    })
    accessToken.value = data.login.access_token
    authedUser.value = data.login.user
    setCookies(data.login.access_token, 'accessToken')
    setCookies(data.login.refresh_token, 'refreshToken')
  }

  const signup = async (auth: AuthInput) => {
    const { data } = await apolloClient.mutate({
      mutation: SIGNUP,
      variables: {
        auth
      }
    })
    accessToken.value = data.signup.access_token
    authedUser.value = data.signup.user
    setCookies(data.login.access_token, 'accessToken')
    setCookies(data.login.refresh_token, 'refreshToken')
  }

  const setCookies = (data: string, keyName: string) => {
    console.log(data)
    const { cookies } = useCookies()
    cookies.set(keyName, data)
  }

  const getCookies = (keyName: string) => {
    const { cookies } = useCookies()
    accessToken.value = cookies.get(keyName)
    return cookies.get(keyName)
  }

  const removeCookies = (keyName: string) => {
    const { cookies } = useCookies()
    cookies.remove(keyName)
  }

  const logout = () => {
    removeCookies('accessToken')
    removeCookies('refreshToken')
    authedUser.value = ''
    accessToken.value = ''
  }

  const updateAccessToken = async () => {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_ACCESS_TOKEN
    })
    setCookies(data.updateToken?.access_token, 'accessToken')
    console.log('TOKEN', data)
  }

  const initializeAuth = () => {
    const token = getCookies('accessToken')
    const refreshToken = getCookies('refreshToken')

    if (token && refreshToken) {
      accessToken.value = token
      isAuthed.value = true
    }
    if (!token && refreshToken) {
      updateAccessToken()
      console.log('update access-token', accessToken)
      accessToken.value = token
      isAuthed.value = true
    } else {
      isAuthed.value = false
    }
  }

  return {
    accessToken,
    authedUser,
    login,
    signup,
    getCookies,
    logout,
    updateAccessToken,
    initializeAuth
  }
})

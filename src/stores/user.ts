import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthInput } from 'cv-graphql'
import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP } from '../graphQL/index'
import router from '@/router'
import { useCookie } from '@/composables/cookies'
import { parseJwt } from '@/utils'
import { getUserData, updateAccessToken } from '@/service/userData'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref()
  const isAuthed = ref(false)
  const { setCookies, getCookies, removeCookies } = useCookie()

  const login = async (auth: AuthInput) => {
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      }
    })
    accessToken.value = data.login.access_token
    authedUser.value = data.login.user
    console.log(authedUser.value)
    setCookies('accessToken', data.login.access_token)
    setCookies('refreshToken', data.login.refresh_token)
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
    setCookies('accessToken', data.login.access_token)
    setCookies('refreshToken', data.login.refresh_token)
  }

  const logout = () => {
    removeCookies('accessToken')
    removeCookies('refreshToken')
    authedUser.value = ''
    accessToken.value = ''
    isAuthed.value = false
    router.push('/auth/login')
  }

  const initializeAuth = async () => {
    const { getCookies } = useCookie()
    let token = getCookies('accessToken')
    const refreshToken = getCookies('refreshToken')

    if (!token && refreshToken) {
      token = await updateAccessToken()
    }

    if (token) {
      const decoded = parseJwt(token)
      if (decoded) {
        const userId = decoded['sub']
        const dataUser = await getUserData(userId)
        if (dataUser) {
          authedUser.value = dataUser
          accessToken.value = token
          isAuthed.value = true
        } else {
          isAuthed.value = false
        }
      } else {
        isAuthed.value = false
      }
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
    initializeAuth
  }
})

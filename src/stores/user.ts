import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { AuthInput } from 'cv-graphql'
import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP } from '../graphQL/index'
import router from '@/router'
import { useCookie } from '@/composables/cookies'
import { parseJwt } from '@/utils'
import { getBaseUserData } from '@/service/userData'
import type { userAuthedT } from '@/models/models'

export const useUserStore = defineStore('user', () => {
  const authedUser = ref<userAuthedT | null>(null)
  const isAuthed = ref<boolean>(false)
  const { setCookies, getCookies, removeCookies } = useCookie()

  const login = async (auth: AuthInput) => {
    const { data } = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: { auth }
    })
    authedUser.value = data.login.user
    setCookies('accessToken', data.login.access_token)
    setCookies('refreshToken', data.login.refresh_token)
  }

  const signup = async (auth: AuthInput) => {
    const { data } = await apolloClient.mutate({
      mutation: SIGNUP,
      variables: { auth }
    })
    authedUser.value = data.signup.user
    setCookies('accessToken', data.signup.access_token)
    setCookies('refreshToken', data.signup.refresh_token)
  }

  const logout = () => {
    removeCookies('accessToken')
    removeCookies('refreshToken')
    authedUser.value = null
    isAuthed.value = false
    router.push('/auth/login')
  }

  const updateUserProfile = (
    user: { department_name?: string; position_name?: string },
    profile: { first_name?: string; last_name?: string }
  ) => {
    if (authedUser.value)
      authedUser.value = {
        ...authedUser.value,
        department_name: user.department_name || null,
        position_name: user.position_name || null,
        profile: {
          ...authedUser.value?.profile,
          first_name: profile.first_name,
          last_name: profile.last_name,
          full_name: `${profile.first_name} ${profile.last_name}`
        }
      }
  }

  const initializeAuth = async () => {
    try {
      const token = getCookies('accessToken')
      const refreshToken = getCookies('refreshToken')

      if (token) {
        const decoded = parseJwt(token)
        if (decoded) {
          const userId = decoded['sub']
          const dataUser = await getBaseUserData(userId)
          if (dataUser) {
            authedUser.value = dataUser
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
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message)
      } else {
        console.log('Error')
      }
    }
  }

  return {
    authedUser,
    login,
    signup,
    getCookies,
    logout,
    initializeAuth,
    updateUserProfile
  }
})

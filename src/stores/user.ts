import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useCookies } from "vue3-cookies";

import apolloClient from '../plugins/apollo'
import { LOGIN_QUERY, SIGNUP, UPDATE_ACCESS_TOKEN } from '../graphQL/index'

export const useUserStore = defineStore('user', () => {
  const accessToken = ref('')
  const authedUser = ref()

  const login = async (auth: any) => {
    console.log("FORM", auth);
     const {data} = await apolloClient.query({
      query: LOGIN_QUERY,
      variables: {
        auth
      }
    })
    accessToken.value = data.login.access_token
    authedUser.value = data.login.user
    setCookies(data.login.access_token, 'accessToken');
    setCookies(data.login.refresh_token, 'refreshToken');
    console.log("Cookies - accessToken", getCookies('accessToken'));
    console.log("Cookies - refreshToken", getCookies('refreshToken'));
    console.log("RESULT", data)
  }

  const signup = async (auth: any) => {
    console.log('auth', auth)
    const {data} = await apolloClient.mutate({
      mutation: SIGNUP,
      variables: {
        auth
      }
    })
    accessToken.value = data.signup.access_token
    authedUser.value = data.signup.user
    setCookies(data.login.access_token, 'accessToken');
    setCookies(data.login.refresh_token, 'refreshToken');
    console.log("Cookies - accessToken", getCookies('accessToken'));
    console.log("Cookies - refreshToken", getCookies('refreshToken'));
    console.log("RESULT", data)
  }

  const setCookies = (data: string, keyName: string) => {
    const { cookies } = useCookies();
    cookies.set(keyName, data);
  };

  const getCookies = (keyName: string) => {
    const { cookies } = useCookies();
    return cookies.get(keyName);
  };

  const removeCookies = (keyName: string) => {
    const { cookies } = useCookies();
    cookies.remove(keyName);
  }

  const logout = () => {
    removeCookies('accessToken');
    removeCookies('refreshToken');
  }

  return { accessToken, login, signup, getCookies, logout }
})


export const updateAccessToken = async () => {
  const {data} = await apolloClient.mutate({
    mutation: UPDATE_ACCESS_TOKEN,
  })
  console.log("TOKEN", data)
}

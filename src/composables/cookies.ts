import { useCookies } from 'vue3-cookies'
import { parseJwt } from '@/utils'

export function useCookie() {
  const { cookies } = useCookies()

  const setCookies = (keyName: string, data: string) => {
    cookies.set(keyName, data)
  }

  const removeCookies = (keyName: string) => {
    cookies.remove(keyName)
  }

  const getCookies = (keyName: string) => {
    const token = cookies.get(keyName)

    if (token && keyName === 'accessToken') {
      const decoded = parseJwt(token)
      const expiredTimestamp = decoded['exp'] * 1000
      const currentTimestamp = new Date().getTime() + 20000
      // console.log('current - ', new Date(currentTimestamp))
      // console.log('expireAt - ', new Date(expiredTimestamp))
      if (currentTimestamp > expiredTimestamp) {
        removeCookies(keyName)
      }
    }
    return token
  }

  return {
    setCookies,
    getCookies,
    removeCookies
  }
}

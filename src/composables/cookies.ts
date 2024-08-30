import { useCookies } from 'vue3-cookies'
import { parseJwt } from '@/utils'

export function useCookie() {
  const { cookies } = useCookies()

  const setCookies = (keyName: string, data: string) => {
    cookies.set(keyName, data)
  }

  const getCookies = (keyName: string) => {
    const token = cookies.get(keyName)

    if (token && keyName === 'accessToken') {
      let isValid: boolean | null = null
      const decoded = parseJwt(token)
      const expiredTimestamp = decoded['exp'] * 1000
      const currentTimestamp = new Date().getTime() + 60000
      // console.log('current - ', new Date(currentTimestamp))
      // console.log('expireAt - ', new Date(expiredTimestamp))
      if (currentTimestamp > expiredTimestamp) {
        isValid = false
      } else {
        isValid = true
      }
      return isValid ? token : null
    }
    return token
  }

  const removeCookies = (keyName: string) => {
    cookies.remove(keyName)
  }

  return {
    setCookies,
    getCookies,
    removeCookies
  }
}

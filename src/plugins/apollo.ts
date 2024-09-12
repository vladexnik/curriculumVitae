import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useCookie } from '@/composables/cookies'
import { updateAccessToken } from '@/service/userData'
import { useUserStore } from '@/stores/user'

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const { getCookies, removeCookies } = useCookie()

let isUpdatingToken: boolean = false
let tokenUpdatePromise: Promise<string> | null = null

const authLink = setContext(async (request, { headers }) => {
  let accessToken: string | null = getCookies('accessToken')
  const refreshToken: string | null = getCookies('refreshToken')

  const isAuthRequest: boolean = ['UpdateToken', 'LOGIN', 'Signup'].includes(
    `${request.operationName}`
  )

  if (!accessToken && refreshToken && !isAuthRequest) {
    if (!isUpdatingToken) {
      isUpdatingToken = true
      tokenUpdatePromise = updateAccessToken()
        .then((newToken) => newToken)
        .catch((error) => {
          console.error('Token update error:', error)
          return refreshToken
        })
        .finally(() => {
          isUpdatingToken = false
        })
    }
    accessToken = await tokenUpdatePromise
  }

  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken ? accessToken : refreshToken}`
    }
  }
})

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

export default apolloClient

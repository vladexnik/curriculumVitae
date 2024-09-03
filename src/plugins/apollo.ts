import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useCookie } from '@/composables/cookies'
import { updateAccessToken } from '@/service/userData'

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const { getCookies } = useCookie()

let isUpdatingToken: boolean = false

let tokenUpdatePromise: Promise<string | null> | null = null

const authLink = setContext(async (request, { headers }) => {
  let accessToken: string | null = getCookies('accessToken')
  const refreshToken: string | null = getCookies('refreshToken')

  const isAuthRequest: boolean = ['UpdateToken', 'LOGIN', 'Signup'].includes(
    `${request.operationName}`
  )

  if (!accessToken && !isAuthRequest) {
    if (!isUpdatingToken) {
      isUpdatingToken = true
      tokenUpdatePromise = updateAccessToken().finally(() => {
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

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

export default apolloClient

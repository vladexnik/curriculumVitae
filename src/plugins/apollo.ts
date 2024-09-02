// apollo
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

const authLink = setContext(async (request, { headers }) => {
  let accessToken = getCookies('accessToken')
  const refreshToken = getCookies('refreshToken')

  const isAuthRequest = ['UpdateToken', 'LOGIN', 'Signup'].includes(
    `${request.operationName}`
  )

  if (!accessToken && !isAuthRequest) {
    accessToken = await updateAccessToken()
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

// apollo
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useCookie } from '@/composables/cookies'

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const { getCookies } = useCookie()

const authLink = setContext(async (_, { headers }) => {
  const accessToken = getCookies('accessToken')
  const refreshToken = getCookies('refreshToken')

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

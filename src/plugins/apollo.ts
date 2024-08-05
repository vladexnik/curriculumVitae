// apollo
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useCookies } from 'vue3-cookies'

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const { cookies } = useCookies()
const accessToken = cookies.get('accessToken')
const refreshToken = cookies.get('refreshToken')

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken ? accessToken : refreshToken}`
    }
  }
})

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }) => {
//       .error(message)
//       if (message === 'Unauthorized') {
//         authService.clearStorageAndLogout()
//       }
//     })
//   }
//   if (networkError) {
//     console.error(networkError)
//   }
// })

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
})

export default apolloClient

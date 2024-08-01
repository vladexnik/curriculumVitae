// apollo
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const access_token = ''

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: `Bearer ${access_token}`
    }
  }
})

// const errorLink = onError(({ graphQLErrors, networkError }) => {
//   if (graphQLErrors) {
//     graphQLErrors.forEach(({ message }) => {
//       console.error(message)
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
  // link: authLink.concat(httpLink),
  link: httpLink,
  cache
})

export default apolloClient

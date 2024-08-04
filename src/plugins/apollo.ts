// apollo
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { useUserStore } from "../stores/user"

const httpLink = createHttpLink({
  uri: 'https://cv-project-js.inno.ws/api/graphql'
})

const userStore = useUserStore();
const { getCookies } = userStore;
const accessToken = getCookies('accessToken');
const refreshToken = getCookies('refreshToken');


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
  link: authLink.concat(httpLink),
  // link: httpLink,
  cache
})

export default apolloClient
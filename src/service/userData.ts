import {
  GET_BASE_USER_DATA_BY_ID,
  GET_USER_DATA_BY_ID,
  GET_USER_NAME,
  UPDATE_ACCESS_TOKEN
} from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import { useCookie } from '@/composables/cookies'
import type { userAuthedT, userNameT, User } from '@/models/models'

const { setCookies } = useCookie()

export const updateAccessToken = async () => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_ACCESS_TOKEN
  })
  setCookies('accessToken', data.updateToken?.access_token)
  console.log('UPDATED TOKEN:', data.updateToken)
  return data.updateToken?.access_token
}

export const getUserData = async (userId: string): Promise<User | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_DATA_BY_ID,
      variables: {
        userId
      },
      fetchPolicy: 'network-only'
    })
    console.log('getUserData:', data.user)
    return data.user
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getBaseUserData = async (userId: string): Promise<userAuthedT> => {
  const { data } = await apolloClient.query({
    query: GET_BASE_USER_DATA_BY_ID,
    variables: {
      userId
    },
    fetchPolicy: 'network-only'
  })
  return data.user
}

export const getUserName = async (userId): Promise<userNameT> => {
  const { data } = await apolloClient.query({
    query: GET_USER_NAME,
    variables: {
      userId
    },
    fetchPolicy: 'cache-first'
  })
  return data.user
}

import {
  GET_USER_DATA_BY_ID,
  GET_USER_NAME,
  UPDATE_ACCESS_TOKEN
} from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import { useCookie } from '@/composables/cookies'

const { setCookies } = useCookie()

export const updateAccessToken = async () => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_ACCESS_TOKEN
    })
    setCookies('accessToken', data.updateToken?.access_token)
    console.log('UPDATED TOKEN:', data.updateToken)
    return data.updateToken?.access_token
  } catch (e) {
    console.log(e)
  }
}

export const getUserData = async (userId): Promise<any> => {
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

export const getUserName = async (userId): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: GET_USER_NAME,
      variables: {
        userId
      },
      fetchPolicy: 'network-only'
    })
    return data.user
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

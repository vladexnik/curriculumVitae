import { GET_USER_DATA_BY_ID, UPDATE_ACCESS_TOKEN } from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import { useCookie } from '@/composables/cookies'

const { setCookies } = useCookie()

export const updateAccessToken = async () => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_ACCESS_TOKEN
  })
  console.log(data)
  setCookies('accessToken', data.updateToken?.access_token)
  console.log('UPDATED TOKEN:', data.updateToken?.access_token, data)
  return data.updateToken?.access_token
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

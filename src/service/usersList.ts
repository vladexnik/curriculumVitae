import { USERS } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getUsersList = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: USERS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

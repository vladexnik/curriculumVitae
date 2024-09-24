import { USERS } from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import type { User } from '@/models/models'

export const getUsersList = async (): Promise<{users: User[]} | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: USERS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

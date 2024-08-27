import { PROJECTS } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getProjectsList = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: PROJECTS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

import { CVS } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getCVsList = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CVS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

import { CVS, DELETE_CV, CREATE_CV } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getCVsList = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CVS,
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const deleteCV = async (id: string): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_CV,
      variables: {
        cv: { cvId: id}
      }, 
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const createCV = async (obj: {name: string, userId: string, education: string, description: string}): Promise<any> => {
  try {
      const { data } = await apolloClient.mutate({
        mutation: CREATE_CV,
        variables: {
          cv: {
            name: obj?.name,
            description: obj?.description,
            education: obj?. education,
            userId: obj.userId
          }
        },
        fetchPolicy: 'network-only'
      })
      return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}
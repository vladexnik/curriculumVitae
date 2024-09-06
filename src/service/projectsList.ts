import { PROJECTS, CV, REMOVE_CV_PROJECT, ADD_CV_PROJECT, UPDATE_CV_PROJECT } from '@/graphQL'
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

export const getProjectsByCvId = async (id): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CV,
      variables: {
         cvId: id
      },
    })
    return data.cv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const addProject = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_CV_PROJECT,
      variables: {
        project: obj
      },
      fetchPolicy: 'network-only'
    })
    return data.addCvProject
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const updateProject = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_CV_PROJECT,
      variables: {
        project: obj
      },
      fetchPolicy: 'network-only'
    })
    return data.updateCvProject
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}
export const deleteProject = async (cvId: string, projectId: string): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: REMOVE_CV_PROJECT,
      variables: {
        project: { cvId: cvId, projectId: projectId }
      },
      fetchPolicy: 'network-only'
    })
    return data.removeCvProject
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

import { DEPARTMENTS, POSITIONS, UPDATE_POSITION } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getAllDepartments = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: DEPARTMENTS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getAllPositions = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: POSITIONS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const updatePosition = async (positionInput) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_POSITION,
      variables: {
        position: positionInput
      }
    })
    console.log('Position updated:', data.updatePosition)
    return data.updatePosition
  } catch (error) {
    console.error('Error updating position:', error)
    throw error
  }
}

import { LANGUAGES, DEPARTMENTS, SKILLS, POSITIONS } from '@/graphQL'
import apolloClient from '@/plugins/apollo'

export const getLanguages = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: LANGUAGES
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getDepartments = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: DEPARTMENTS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getSkills = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: SKILLS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getPositions= async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: POSITIONS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}


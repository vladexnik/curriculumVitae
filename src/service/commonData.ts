import { LANGUAGES, DEPARTMENTS, SKILLS, POSITIONS, ADD_PROFILE_LANGUAGE, UPDATE_PROFILE_LANGUAGE, DELETE_PROFILE_LANGUAGE, ADD_PROFILE_SKILL, UPDATE_PROFILE_SKILL, DELETE_PROFILE_SKILL } from '@/graphQL'
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

export const addLanguage = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_PROFILE_LANGUAGE,
      variables: {
        language: obj
      }, 
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const updateLanguage = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PROFILE_LANGUAGE,
      variables: {
        language: obj
      }, 
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const deleteLanguage = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_PROFILE_LANGUAGE,
      variables: {
        language: obj
      }, 
      fetchPolicy: 'network-only'
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

export const addSkill= async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: ADD_PROFILE_SKILL,
      variables: {
        skill: obj
      }, 
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const updateSkill = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PROFILE_SKILL,
      variables: {
        skill: obj
      }, 
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const deleteSkill = async (obj): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: DELETE_PROFILE_SKILL,
      variables: {
        skill: obj
      }, 
      fetchPolicy: 'network-only'
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


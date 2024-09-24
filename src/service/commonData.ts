import { LANGUAGES, DEPARTMENTS, SKILLS, POSITIONS, ADD_PROFILE_LANGUAGE, UPDATE_PROFILE_LANGUAGE, DELETE_PROFILE_LANGUAGE, ADD_PROFILE_SKILL, UPDATE_PROFILE_SKILL, DELETE_PROFILE_SKILL, SKILLS_CATEGORIES } from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import type { ISkillCategories, ILanguage, IProfileSkill, IProfileLanguage } from '@/models/models'
import type {
  Department,
  Position
} from 'cv-graphql'
export const getLanguages = async (): Promise<{langugaes: ILanguage[]} | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: LANGUAGES
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const addLanguage = async (obj): Promise<IProfileLanguage | undefined> => {
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

export const updateLanguage = async (obj): Promise<IProfileLanguage | undefined> => {
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

export const deleteLanguage = async (obj): Promise<IProfileLanguage | undefined> => {
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

export const getDepartments = async (): Promise<{ departments: Department[] } | undefined>  => {
  try {
    const { data } = await apolloClient.query({
      query: DEPARTMENTS
    })
    if (data) {
     return data
    }
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getCategories = async (): Promise<{skillsCategories: ISkillCategories[]} | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: SKILLS_CATEGORIES
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}


export const getSkills = async (): Promise<ISkillCategories | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: SKILLS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const addSkill = async (obj): Promise<IProfileSkill | undefined> => {
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

export const updateSkill = async (obj): Promise<IProfileSkill | undefined> => {
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

export const deleteSkill = async (obj): Promise<IProfileSkill | undefined> => {
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

export const getPositions= async (): Promise<{positions: Position[]} | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: POSITIONS
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}


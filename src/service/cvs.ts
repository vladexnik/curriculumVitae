import {
  CVS,
  DELETE_CV,
  CREATE_CV,
  CV,
  UPDATE_CV_DETAILS,
  CV_NAME,
  CV_DETAILS,
  CV_SKILLS,
  SKILL_CATEGORIES,
  EXPORT_PDF
} from '@/graphQL'
import apolloClient from '@/plugins/apollo'
import type { ExportPdfInput } from 'cv-graphql'

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
        cv: { cvId: id }
      },
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const exportPDFCv = async (pdf: ExportPdfInput): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: EXPORT_PDF,
      variables: {
        pdf
      },
      fetchPolicy: 'network-only'
    })
    return data.exportPdf
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getCVById = async (cvId): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CV,
      variables: {
        cvId
      },
      fetchPolicy: 'network-only'
    })
    return data.cv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getCVNameById = async (cvId): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CV_NAME,
      variables: {
        cvId
      },
      fetchPolicy: 'cache-first'
    })
    return data.cv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getCVDetailsById = async (cvId): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CV_DETAILS,
      variables: {
        cvId
      },
      fetchPolicy: 'network-only'
    })
    return data.cv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const createCV = async (obj: {
  name: string
  userId: string
  education: string
  description: string
}): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: CREATE_CV,
      variables: {
        cv: {
          name: obj?.name,
          description: obj?.description,
          education: obj?.education,
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

export const updateCVDetails = async (cv: any): Promise<any> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_CV_DETAILS,
      variables: {
        cv: cv
      },
      fetchPolicy: 'network-only'
    })
    return data.updateCv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
    return null // or you could return a default Cv object
  }
}

export const getCVPreview = async (cvId): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: CV_SKILLS,
      variables: {
        cvId
      },
      fetchPolicy: 'network-only'
    })
    return data.cv
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const getSkillCategories = async (): Promise<any> => {
  try {
    const { data } = await apolloClient.query({
      query: SKILL_CATEGORIES,
      fetchPolicy: 'network-only'
    })
    return data.skillCategories
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

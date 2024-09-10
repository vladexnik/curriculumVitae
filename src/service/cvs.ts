import {
  CVS,
  DELETE_CV,
  CREATE_CV,
  CV,
  UPDATE_CV_DETAILS,
  CV_NAME,
  CV_DETAILS,
  CV_SKILLS,
  EXPORT_PDF
} from '@/graphQL'
import type { createCVT, CVData, cvDetailsDataT, CVsAll } from '@/models/models'
import apolloClient from '@/plugins/apollo'
import type {
  DeleteCvInput,
  DeleteResult,
  ExportPdfInput,
  UpdateCvInput
} from 'cv-graphql'
import { useToastNotifications } from '@/composables/useToast'
// const { showError } = useToastNotifications()

export const getCVsList = async (): Promise<CVsAll | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: CVS,
      fetchPolicy: 'network-only'
    })
    return data
  } catch (e) {
    console.log(e)
  }
}

export const deleteCV = async (
  id: DeleteCvInput
): Promise<DeleteResult | undefined> => {
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
    console.log(e)
  }
}

export const exportPDFCV = async (pdf: ExportPdfInput): Promise<string> => {
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
    console.log(e)
    throw new Error('Error exporting PDF')
  }
}

export const getCVById = async (cvId: string): Promise<any> => {
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
    console.log(e)
  }
}

export const getCVNameById = async (
  cvId: string
): Promise<{ id: string; name: string } | undefined> => {
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
    console.log(e)
  }
}

export const getCVDetailsById = async (
  cvId: string
): Promise<cvDetailsDataT | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: CV_DETAILS,
      variables: {
        cvId
      },
      fetchPolicy: 'cache-first'
    })
    return data.cv
  } catch (e) {
    console.log(e)
  }
}

export const createCV = async (
  obj: createCVT
): Promise<createCVT | undefined> => {
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
    console.log(e)
  }
}

export const updateCVDetails = async (
  cv: UpdateCvInput
): Promise<cvDetailsDataT | undefined> => {
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
    console.log(e)
  }
}

export const getCVPreview = async (
  cvId: string
): Promise<CVData | undefined> => {
  try {
    const { data } = await apolloClient.query({
      query: CV_SKILLS,
      variables: {
        cvId
      },
      fetchPolicy: 'cache-first'
    })
    return data.cv
  } catch (e) {
    console.log(e)
  }
}

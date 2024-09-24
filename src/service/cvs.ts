import {
  CVS,
  DELETE_CV,
  CREATE_CV,
  CV,
  UPDATE_CV_DETAILS,
  CV_NAME,
  CV_SKILLS,
  EXPORT_PDF,
  CV_DETAILS,
  ADD_CV_SKILL,
  UPDATE_CV_SKILL,
  DELETE_CV_SKILL
 } from '@/graphQL'
 import type { createCVT, CVData, cvDetailsDataT, CVsAll } from '@/models/models'
 import apolloClient from '@/plugins/apollo'
 import type {
  DeleteCvInput,
  DeleteResult,
  ExportPdfInput,
  UpdateCvInput
 } from 'cv-graphql'
 
 
 export const getCVsList = async (): Promise<CVsAll> => {
  const { data } = await apolloClient.query({
    query: CVS,
    fetchPolicy: 'network-only'
  })
  return data
 }
 
 
 export const deleteCV = async (id: DeleteCvInput): Promise<DeleteResult> => {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_CV,
    variables: {
      cv: { cvId: id }
    },
    fetchPolicy: 'network-only'
  })
  return data
 }
 
 
 export const exportPDFCV = async (pdf: ExportPdfInput): Promise<string> => {
  const { data } = await apolloClient.mutate({
    mutation: EXPORT_PDF,
    variables: {
      pdf
    },
    fetchPolicy: 'network-only'
  })
  return data.exportPdf
 }
 
 export const getCVById = async (cvId: string): Promise<CVData> => {
  const { data } = await apolloClient.query({
    query: CV,
    variables: {
      cvId
    },
    fetchPolicy: 'network-only'
  })
  return data.cv
 }
 
 export const getCVNameById = async (
  cvId: string
 ): Promise<{ id: string; name: string }> => {
  const { data } = await apolloClient.query({
    query: CV_NAME,
    variables: {
      cvId
    },
    fetchPolicy: 'cache-first'
  })
  return data.cv
 }
 
 export const getCVDetailsById = async (
  cvId: string
 ): Promise<cvDetailsDataT> => {
  const { data } = await apolloClient.query({
    query: CV_DETAILS,
    variables: {
      cvId
    },
    fetchPolicy: 'cache-first'
  })
  return data.cv
 }
 
export const createCV = async (obj: createCVT): Promise<createCVT> => {
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
 }
 
 
 export const updateCVDetails = async (
  cv: UpdateCvInput
 ): Promise<cvDetailsDataT> => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_CV_DETAILS,
    variables: {
      cv: cv
    },
    fetchPolicy: 'network-only'
  })
  return data.updateCv
 }
 
 
 export const getCVPreview = async (cvId: string): Promise<CVData> => {
  const { data } = await apolloClient.query({
    query: CV_SKILLS,
    variables: {
      cvId
    },
    fetchPolicy: 'cache-first'
  })
  return data.cv
 }
 
 
 export const addCvSkill = async (obj): Promise<cvDetailsDataT> => {
  const { data } = await apolloClient.mutate({
    mutation: ADD_CV_SKILL,
    variables: {
      skill: obj
    },
    fetchPolicy: 'network-only'
  })
  return data
 }
 
 
 export const updateCvSkill = async (obj): Promise<cvDetailsDataT> => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_CV_SKILL,
    variables: {
      skill: obj
    },
    fetchPolicy: 'network-only'
  })
  return data
 }
 
 
 export const deleteCvSkill = async (obj): Promise<cvDetailsDataT> => {
  const { data } = await apolloClient.mutate({
    mutation: DELETE_CV_SKILL,
    variables: {
      skill: obj
    },
    fetchPolicy: 'network-only'
  })
  return data
 }
 
 
 
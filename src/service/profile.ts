import {
  DELETE_AVATAR,
  DEPARTMENTS,
  POSITIONS,
  UPDATE_PROFILE,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '@/graphQL'
import type { UpdateProfileInputsT, UpdateUserPosDepT } from '@/models/models'
import apolloClient from '@/plugins/apollo'
import type {
  DeleteAvatarInput,
  Department,
  Position,
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput
} from 'cv-graphql'

export const getAllDepartments = async (): Promise<Department[]> => {
  const { data } = await apolloClient.query({
    query: DEPARTMENTS
  })
  return data.departments
}

export const getAllPositions = async (): Promise<Position[]> => {
  const { data } = await apolloClient.query({
    query: POSITIONS
  })
  return data.positions
}

export const updateProfileInput = async (
  profile: UpdateProfileInput
): Promise<UpdateProfileInputsT> => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_PROFILE,
    variables: {
      profile
    }
  })
  return data.updateProfile
}

export const updateUserSelects = async (
  user: UpdateUserInput
): Promise<UpdateUserPosDepT> => {
  const { data } = await apolloClient.mutate({
    mutation: UPDATE_USER,
    variables: { user }
  })
  return data.updateUser
}

export const deleteAvatar = async (
  avatar: DeleteAvatarInput
): Promise<void> => {
  await apolloClient.mutate({
    mutation: DELETE_AVATAR,
    variables: {
      avatar
    }
  })
}

export const uploadAvatar = async (
  avatar: UploadAvatarInput
): Promise<string> => {
  const { data } = await apolloClient.mutate({
    mutation: UPLOAD_AVATAR,
    variables: {
      avatar
    }
  })
  return data.uploadAvatar
}

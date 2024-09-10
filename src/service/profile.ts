import {
  DELETE_AVATAR,
  DEPARTMENTS,
  POSITIONS,
  UPDATE_POSITION,
  UPDATE_PROFILE,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '@/graphQL'
import type { UpdateProfileInputsT, UpdateUserPosDepT } from '@/models/models'
import apolloClient from '@/plugins/apollo'
import type {
  DeleteAvatarInput,
  UpdateProfileInput,
  UpdateUserInput,
  UploadAvatarInput
} from 'cv-graphql'

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

export const updateProfileInput = async (
  profile: UpdateProfileInput
): Promise<UpdateProfileInputsT> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PROFILE,
      variables: {
        profile
      }
    })
    return data.updateProfile
  } catch (e) {
    throw new Error('Failed to update user fields')
  }
}

export const updateUserInput = async (
  user: UpdateUserInput
): Promise<UpdateUserPosDepT> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: { user }
    })

    if (!data || !data.updateUser) {
      throw new Error('No data returned from updateUser mutation')
    }

    return data.updateUser
  } catch (e) {
    throw new Error('Failed to update user')
  }
}

export const deleteAvatar = async (
  avatar: DeleteAvatarInput
): Promise<void> => {
  try {
    await apolloClient.mutate({
      mutation: DELETE_AVATAR,
      variables: {
        avatar
      }
    })
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const uploadAvatar = async (
  avatar: UploadAvatarInput
): Promise<string | undefined> => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPLOAD_AVATAR,
      variables: {
        avatar
      }
    })
    console.log(data)

    return data.uploadAvatar
  } catch (e) {
    console.log('Error uploading image')
  }
}

import {
  DELETE_AVATAR,
  DEPARTMENTS,
  POSITIONS,
  UPDATE_POSITION,
  UPDATE_PROFILE,
  UPDATE_USER,
  UPLOAD_AVATAR
} from '@/graphQL'
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

export const updateProfileInput = async (profile: UpdateProfileInput) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_PROFILE,
      variables: {
        profile
      }
    })
    return data.updateProfile
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
  }
}

export const updateUserInput = async (user: UpdateUserInput) => {
  try {
    const { data } = await apolloClient.mutate({
      mutation: UPDATE_USER,
      variables: {
        user
      }
    })
    return data.updateUser
  } catch (e) {
    console.error(JSON.stringify(e, null, 2))
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
  // try {
  const { data } = await apolloClient.mutate({
    mutation: UPLOAD_AVATAR,
    variables: {
      avatar
    }
  })
  console.log(data)

  return data.uploadAvatar
  // } catch (e) {
  //   console.log('err image')
  //   useToast().add({
  //     detail: 'Failed to fetch',
  //     life: 3000
  //   })
  //   // console.error(JSON.stringify(e, null, 2))
  // }
}

export type TabsAuthT = {
  route: string
  label: string
}

export type UpdateProfileInputT = {
  userId: number
  first_name: string
  last_name: string
}

export type cvUserDataT = {
  email: string
  id: string
  __typename: string
}

export type fetchedCvT = {
  description: string
  education: string
  id: string
  name: string
  user: cvUserDataT
}

// export type UserDataT = {
//   created_at: string
//   department_name: string
//   email: string
//   id: string | number
//   position_name: string,
//   profile {
//           full_name
//           avatar
//         }
// }

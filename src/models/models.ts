import type { LanguageProficiency, Mastery } from 'cv-graphql'

type Nullable<T> = T | null

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

export type SkillMastery = {
  name: string
  categoryId?: Nullable<string>
  mastery: Mastery
}

export type SkillCategory = {
  __typename: string
  id: string
  name: string
  order: number
  parent: SkillCategory | null
}

export type CVUser = {
  id: string
  email: string
  department_name: string
  position_name: string
  profile: {
    full_name: string
  }
}

export type CVProjectBase = {
  name: string
  description: string
  domain: string
  start_date: string
  end_date: string
  environment: string[]
  responsibilities: string[]
}

export type CVData = {
  id: string
  created_at: string
  name: string
  education: string
  description: string
  user: CVUser
  projects: CVProjectBase[]
  skills: SkillMastery[]
  languages: LanguageProficiency[]
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

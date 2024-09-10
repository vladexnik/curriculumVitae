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

export type cvDetailsDataT = {
  description: string
  education: string
  id: string
  name: string
  user: {
    email: string
    id: string
  }
}

export type SkillMastery = {
  name: string
  categoryId?: Nullable<string>
  mastery: Mastery
}

export type SkillCategory = {
  id: string
  name: string
  order: number
  parent: SkillCategory | null
}

export type createCVT = {
  name: string
  userId: string
  education: string
  description: string
}

export type CVsAll = {
  id: string
  name: string
  education: string
  description: string
  user: {
    id: string
    email: string
  }
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

export type TableDataArray = {
  categoryId: string | null
  category: string | null
  name: string
  experience: number | null
  lastUsed: string
}

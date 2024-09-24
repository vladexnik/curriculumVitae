import { Proficiency, Mastery } from "@/components/ui-kit/constants/constants"

export type TabsAuthT = {
  route: string
  label: string
}

export type breadcrumbObjT = {
  label: string
  route: {
    name: string
    params?: {
      id?: string
    }
  } | null
  styleClass: string
}

export type userAuthedT = {
  created_at: string
  department_name?: Nullable<string>
  email: string
  id: string
  position_name?: Nullable<string>
  profile: {
    avatar?: Nullable<string>
    first_name?: Nullable<string>
    full_name?: Nullable<string>
    last_name?: Nullable<string>
  }
}

export type userNameT = {
  email: string
  profile: {
    first_name?: Nullable<string>
    last_name?: Nullable<string>
    full_name?: Nullable<string>
  }
}

export type UpdateProfileInputsT = {
  id: string
  first_name: string
  last_name: string
  full_name: string
  avatar: string
}

export type UpdateUserPosDepT = {
  department_name?: Nullable<string>
  position_name?: Nullable<string>
}
export type selectProfileT = {
  id: string
  name: string
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

export interface Position {
  id: string;
  created_at: string;
  name: string;
}

export interface Project {
  id: string;
  created_at: string;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date?: Nullable<string>;
  team_size: number;
  tech_stack?: Nullable<Skill[]>;
}

export interface Skill {
  id: string;
  created_at: string;
  name: string;
  category?: Nullable<string>;
}

export interface CvProject {
  id: string;
  project: Project;
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date?: Nullable<string>;
  team_size: number;
  roles: string[];
  responsibilities: string[];
}

export interface Cv {
  id: string;
  created_at: string;
  name: string;
  education?: Nullable<string>;
  description: string;
  user?: Nullable<User>;
  projects?: Nullable<CvProject[]>;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface Department {
  id: string;
  created_at: string;
  name: string;
}
 
export interface LanguageProficiency {
  name: string;
  proficiency: Proficiency;
}

export interface Profile {
  id: string;
  created_at: string;
  first_name?: Nullable<string>;
  last_name?: Nullable<string>;
  full_name?: Nullable<string>;
  avatar?: Nullable<string>;
  skills: SkillMastery[];
  languages: LanguageProficiency[];
}

export interface User {
  id: string;
  created_at: string;
  email: string;
  is_verified: boolean;
  profile: Profile;
  cvs?: Nullable<Cv[]>;
  department?: Nullable<Department>;
  department_name?: Nullable<string>;
  position?: Nullable<Position>;
  position_name?: Nullable<string>;
}

export interface ISkillCategories {
  id: string
  name: string
  order: string
  parent: IParentCategory
}

export interface IParentCategory {
  id: string
  name: string
  order: string
}

export interface ILanguage {
  id: string;
  created_at: string;
  iso2: string;
  name: string;
  native_name?: Nullable<string>;
}

export interface IProfileSkill {
  id: string;
  full_name: string;
  skills: SkillMastery[];
}

export interface IProfileLanguage {
  id: string;
  full_name: string;
  languages: LanguageProficiency[];
}

export type Void = any;
type Nullable<T> = T | null;


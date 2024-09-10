import { gql } from 'graphql-tag'

export const LOGIN_QUERY = gql`
  query LOGIN($auth: AuthInput!) {
    login(auth: $auth) {
      user {
        id
        created_at
        email
        position_name
        department_name
        profile {
          first_name
          last_name
          full_name
          avatar
        }
      }
      access_token
      refresh_token
    }
  }
`

export const GET_BASE_USER_DATA_BY_ID = gql`
  query USER($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      position_name
      department_name
      profile {
        first_name
        last_name
        full_name
        avatar
      }
    }
  }
`

export const GET_USER_DATA_BY_ID = gql`
  query USER($userId: ID!) {
    user(userId: $userId) {
      id
      created_at
      email
      position_name
      department_name
      cvs {
        id
        name
        education
        description
        user {
          id
          email
        }
        projects {
          id
          name
          domain
          start_date
          end_date
          description
          responsibilities
        }
      }
      profile {
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          categoryId
          mastery
        }
        languages {
          name
          proficiency
        }
      }
    }
  }
`

export const GET_USER_NAME = gql`
  query USER($userId: ID!) {
    user(userId: $userId) {
      email
      profile {
        first_name
        last_name
        full_name
      }
    }
  }
`

export const CVS = gql`
  query Cvs {
    cvs {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`

export const CV = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      created_at
      user {
        id
        email
        department_name
        position_name
        profile {
          full_name
        }
      }
      projects {
        name
        internal_name
        description
        domain
        start_date
        end_date
        responsibilities
        project {
          id
        }
      }
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`

export const CV_NAME = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
    }
  }
`

export const CV_DETAILS = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      user {
        id
        email
      }
    }
  }
`

export const CV_SKILLS = gql`
  query CV($cvId: ID!) {
    cv(cvId: $cvId) {
      id
      name
      education
      description
      created_at
      user {
        id
        email
        department_name
        position_name
        profile {
          full_name
        }
      }
      projects {
        name
        description
        domain
        start_date
        end_date
        environment
        responsibilities
      }
      skills {
        name
        categoryId
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`

export const SKILLS_CATEGORIES = gql`
  query skillCategories {
    skillCategories {
      id
      name
      order
      parent {
        id
        name
        order
      }
    }
  }
`

export const DEPARTMENTS = gql`
  query DEPARTMENTS {
    departments {
      id
      name
    }
  }
`

export const LANGUAGES = gql`
  query LANGUAGESS {
    languages {
      id
      name
      native_name
      iso2
    }
  }
`

export const POSITIONS = gql`
  query POSITIONS {
    positions {
      id
      name
    }
  }
`

export const POSITION = gql`
  query POSITION($id: ID!) {
    position(id: $id) {
      id
      name
    }
  }
`

export const PROFILE = gql`
  query PROFILE($id: ID!) {
    profile(id: $id) {
      id
      first_name
      last_name
      full_name
      avatar
      skills {
        name
        category
        mastery
      }
      languages {
        name
        proficiency
      }
    }
  }
`

export const PROJECTS = gql`
  query PROJECTS {
    projects {
      id
      created_at
      name
      internal_name
      domain
      start_date
      end_date
      description
      environment
    }
  }
`

export const PROJECT = gql`
  query PROJECT($id: ID!) {
    project(id: $id) {
      id
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        name
        category
      }
    }
  }
`

export const SKILLS = gql`
  query SKILLS {
    skills {
      id
      name
      category_parent_name
      category_name
    }
  }
`

export const USERS = gql`
  query USERS {
    users {
      id
      email
      profile {
        first_name
        last_name
        avatar
      }
      position_name
      department_name
    }
  }
`

export const USER = gql`
  query USER($id: ID!) {
    user(id: $id) {
      id
      email
      profile {
        first_name
        last_name
        full_name
        avatar
        skills {
          name
          category
          mastery
        }
        languages {
          name
          proficiency
        }
      }
      cvs {
        id
        name
        education
        description
        projects {
          id
          name
          internal_name
          description
          domain
        }
      }
      position_name
      department_name
    }
  }
`

//mutations

export const SIGNUP = gql`
  mutation Signup($auth: AuthInput!) {
    signup(auth: $auth) {
      user {
        id
        created_at
        email
        position_name
        department_name
        profile {
          first_name
          last_name
          full_name
          avatar
        }
      }
      access_token
      refresh_token
    }
  }
`

export const ADD_CV_PROJECT = gql`
  mutation AddCvProject($project: AddCvProjectInput!) {
    addCvProject(project: $project) {
      id
      name
      user {
        id
      }
      description
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        responsibilities
        project {
          id
        }
      }
    }
  }
`

export const UPDATE_CV_PROJECT = gql`
  mutation UpdateCvProject($project: UpdateCvProjectInput!) {
    updateCvProject(project: $project) {
      id
      name
      user {
        id
      }
      description
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        responsibilities
        project {
          id
        }
      }
    }
  }
`

export const REMOVE_CV_PROJECT = gql`
  mutation RemoveCvProject($project: RemoveCvProjectInput!) {
    removeCvProject(project: $project) {
      id
      name
      user {
        id
      }
      description
      projects {
        id
        name
        domain
        start_date
        end_date
        description
        responsibilities
        project {
          id
        }
      }
    }
  }
`

export const ADD_CV_SKILL = gql`
  mutation AddCvSkill($skill: AddCvSkillInput!) {
    addCvSkill(skill: $skill) {
      id
      name
      user {
        id
      }
      skills {
        name
        mastery
      }
    }
  }
`

export const UPDATE_CV_SKILL = gql`
  mutation UpdateCvSkill($skill: UpdateCvSkillInput!) {
    updateCvSkill(skill: $skill) {
      id
      name
      profile {
        id
      }
      user {
        name
        mastery
      }
    }
  }
`

export const DELETE_CV_SKILL = gql`
  mutation DeleteCvSkill($skill: DeleteCvSkillInput!) {
    deleteCvSkill(skill: $skill) {
      id
      name
      user {
        id
      }
      skills {
        name
        mastery
      }
    }
  }
`

export const CREATE_CV = gql`
  mutation CreateCv($cv: CreateCvInput!) {
    createCv(cv: $cv) {
      id
      name
      education
      description
      user {
        id
      }
    }
  }
`

export const UPDATE_CV = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      user {
        id
      }
    }
  }
`

export const UPDATE_CV_DETAILS = gql`
  mutation UpdateCv($cv: UpdateCvInput!) {
    updateCv(cv: $cv) {
      id
      name
      education
      description
      user {
        email
        id
      }
    }
  }
`

export const DELETE_CV = gql`
  mutation DeleteCv($cv: DeleteCvInput!) {
    deleteCv(cv: $cv) {
      affected
    }
  }
`

export const EXPORT_PDF = gql`
  mutation ExportPdf($pdf: ExportPdfInput!) {
    exportPdf(pdf: $pdf)
  }
`

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($department: CreateDepartmentInput!) {
    createDepartment(department: $department) {
      id
      name
    }
  }
`

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($department: UpdateDepartmentInput!) {
    updateDepartment(department: $department) {
      id
      name
    }
  }
`

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($department: DeleteDepartmentInput!) {
    deleteDepartment(department: $department)
  }
`

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($language: CreateLanguageInput!) {
    createLanguage(language: $language) {
      id
      name
      iso2
    }
  }
`

export const UPDATE_LANGUAGE = gql`
  mutation UpdateLanguage($language: UpdateLanguageInput!) {
    updateLanguage(language: $language) {
      id
      name
      iso2
    }
  }
`

export const DELETE_LANGUAGE = gql`
  mutation DeleteLanguage($language: DeleteLanguageInput!) {
    deleteLanguage(language: $language)
  }
`

export const VERIFY_MAIL = gql`
  mutation VerifyMail($mail: VerifyMailInput!) {
    verifyMail(mail: $mail)
  }
`

export const CREATE_POSITION = gql`
  mutation CreatePosition($position: CreatePositionInput!) {
    createPosition(position: $position) {
      id
      name
    }
  }
`

export const UPDATE_POSITION = gql`
  mutation UpdatePosition($position: UpdatePositionInput!) {
    updatePosition(position: $position) {
      id
      name
    }
  }
`

export const DELETE_POSITION = gql`
  mutation DeletePosition($position: DeletePositionInput!) {
    deletePosition(position: $position)
  }
`

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($profile: UpdateProfileInput!) {
    updateProfile(profile: $profile) {
      id
      first_name
      last_name
      full_name
      avatar
    }
  }
`

export const ADD_PROFILE_SKILL = gql`
  mutation AddProfileSkill($skill: AddProfileSkillInput!) {
    addProfileSkill(skill: $skill) {
      id
      full_name
      skills {
        name
        mastery
      }
    }
  }
`

export const UPDATE_PROFILE_SKILL = gql`
  mutation UpdateProfileSkill($skill: UpdateProfileSkillInput!) {
    updateProfileSkill(skill: $skill) {
      id
      full_name
      skills {
        name
        mastery
      }
    }
  }
`

export const DELETE_PROFILE_SKILL = gql`
  mutation DeleteProfileSkill($skill: DeleteProfileSkillInput!) {
    deleteProfileSkill(skill: $skill) {
      id
      full_name
      skills {
        name
        mastery
      }
    }
  }
`

export const ADD_PROFILE_LANGUAGE = gql`
  mutation AddProfileLanguage($language: AddProfileLanguageInput!) {
    addProfileLanguage(language: $language) {
      id
      full_name
      languages {
        name
        proficiency
      }
    }
  }
`

export const UPDATE_PROFILE_LANGUAGE = gql`
  mutation UpdateProfileLanguage($language: UpdateProfileLanguageInput!) {
    updateProfileLanguage(language: $language) {
      id
      full_name
      languages {
        name
        proficiency
      }
    }
  }
`

export const DELETE_PROFILE_LANGUAGE = gql`
  mutation DeleteProfileLanguage($language: DeleteProfileLanguageInput!) {
    deleteProfileLanguage(language: $language) {
      id
      full_name
      languages {
        name
        proficiency
      }
    }
  }
`

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: CreateSkillInput!) {
    createSkill(skill: $skill) {
      id
      name
      category
    }
  }
`

export const UPDATE_SKILL = gql`
  mutation UpdateSkill($skill: UpdateSkillInput!) {
    updateSkill(skill: $skill) {
      id
      name
      category
    }
  }
`

export const DELETE_SKILL = gql`
  mutation DeleteSkill($skill: DeleteSkillInput!) {
    deleteSkill(skill: $skill) {
      id
      name
      category
    }
  }
`

export const CREATE_PROJECT = gql`
  mutation CreateProject($project: CreateProjectInput!) {
    createProject(project: $project) {
      id
      name
      domain
      team_size
      start_date
      end_date
      description
    }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject($position: UpdateProjectInput!) {
    updateProject(project: $project) {
      id
      name
      domain
      team_size
      start_date
      end_date
      description
    }
  }
`

export const DELETE_PROJECT = gql`
  mutation DeleteProject($project: DeleteProjectInput!) {
    deleteProject(project: $project)
  }
`

export const CREATE_USER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      email
      is_verified
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($user: UpdateUserInput!) {
    updateUser(user: $user) {
      department_name
      position_name
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($user: DeleteUserInput!) {
    deleteUser(user: $user)
  }
`

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($avatar: UploadAvatarInput!) {
    uploadAvatar(avatar: $avatar)
  }
`

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($avatar: DeleteAvatarInput!) {
    deleteAvatar(avatar: $avatar)
  }
`

export const UPDATE_ACCESS_TOKEN = gql`
  mutation UpdateToken {
    updateToken {
      access_token
      refresh_token
    }
  }
`

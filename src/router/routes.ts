import Users from '../views/users/Index.vue'
import UserId from '../views/users/id/Index.vue'
import UserCvs from '../views/users/id/UserCvs.vue'
import UserSkills from '../views/users/id/UserSkills.vue'
import UserLanguages from '../views/users/id/UserLanguages.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Cvs from '../views/cvs/Index.vue'
import CvId from '../views/cvs/id/Index.vue'
import Preview from '../views/cvs/id/Preview.vue'
import Projects from '../views/cvs/id/Projects.vue'
import Skills from '../views/cvs/id/Skills.vue'
import ProjectsAll from '@/views/ProjectsAll.vue'
import Departments from '../views/Departments.vue'
import Positions from '../views/Positions.vue'
import Settings from '../views/Settings.vue'
import AllSkills from '../views/AllSkills.vue'
import Languages from '@/views/Languages.vue'
import ComponentsUsage from '@/components/ComponentsUsage.vue'

const routes = [
  {
    path: '/users',
    name: 'Employees',
    component: Users,
    meta: {
      isAuth: true,
      breadcrumb: 'employees'
    }
  },
  {
    path: '/users',
    name: 'Users',
    meta: {
      isAuth: true,
      hasTabs: true,
      breadcrumb: 'employees'
    },
    children: [
      {
        path: ':id',
        name: 'Employee',
        component: UserId,
        meta: {
          breadcrumb: (route) => route?.params?.id
        }
      },
      {
        path: ':id/cvs',
        name: 'UserCvs',
        component: UserCvs,
        meta: { breadcrumb: 'cvs' }
      },
      {
        path: ':id/skills',
        name: 'UserSkills',
        component: UserSkills,
        meta: { breadcrumb: 'skills' }
      },
      {
        path: ':id/languages',
        name: 'UserLanguages',
        component: UserLanguages,
        meta: { breadcrumb: 'languages' }
      }
    ]
  },
  {
    path: '/cvs',
    name: 'CVsAll',
    component: Cvs,
    meta: {
      isAuth: true,
      breadcrumb: 'cvs'
    }
  },
  {
    path: '/cvs',
    name: 'CVs',
    meta: {
      isAuth: true,
      hasTabs: true,
      breadcrumb: 'cvs'
    },
    children: [
      {
        path: ':id',
        name: 'CVId',
        component: CvId,
        meta: {
          breadcrumb: (route) => route?.params?.id
        }
      },
      {
        path: ':id/projects',
        name: 'CVProjects',
        component: Projects,
        meta: { breadcrumb: 'projects' }
      },
      {
        path: ':id/skills',
        name: 'CVSkills',
        component: Skills,
        meta: { breadcrumb: 'skills' }
      },
      {
        path: ':id/preview',
        name: 'CVPreview',
        component: Preview,
        meta: { breadcrumb: 'preview' }
      }
    ]
  },
  {
    path: '/projects',
    name: 'Projects',
    component: ProjectsAll,
    meta: {
      isAuth: true,
      breadcrumb: 'projects'
    }
  },

  {
    path: '/auth/login',
    name: 'login',
    component: Login,
    meta: {
      isAuth: false
    }
  },
  {
    path: '/auth/signup',
    name: 'signup',
    component: Signup,
    meta: {
      isAuth: false
    }
  },
  {
    path: '/skills',
    name: 'Skills',
    component: AllSkills,
    meta: {
      isAuth: true,
      breadcrumb: 'skills'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      isAuth: true,
      breadcrumb: 'settings'
    }
  },
  {
    path: '/positions',
    name: 'Positions',
    component: Positions,
    meta: {
      isAuth: true,
      breadcrumb: 'positions'
    }
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
    meta: {
      isAuth: true,
      breadcrumb: 'departments'
    }
  },
  {
    path: '/languages',
    name: 'Languages',
    component: Languages,
    meta: {
      isAuth: true,
      breadcrumb: 'languages'
    }
  },
  {
    path: '/ui',
    name: 'UI',
    component: ComponentsUsage,
    meta: {
      isAuth: false
    }
  }
]

export default routes

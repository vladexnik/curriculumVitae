import { createRouter, createWebHistory } from 'vue-router'
//users routes
import Users from '../views/users/Index.vue'
import UserId from '../views/users/id/Index.vue'
import UserCvs from '../views/users/id/UserCvs.vue'
import UserSkills from '../views/users/id/UserSkills.vue'
import UserLanguages from '../views/users/id/UserLanguages.vue'

//auth routes
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import HomeView from '@/views/HomeView.vue'

//cvs routes
import Cvs from '../views/cvs/Index.vue'
import CvId from '../views/cvs/id/Index.vue'
import Preview from '../views/cvs/id/Preview.vue'
import Projects from '../views/cvs/id/Projects.vue'
import Skills from '../views/cvs/id/Skills.vue'
import ProjectsAll from '@/views/ProjectsAll.vue'

//common routes
import Departments from '../views/Departments.vue'
import Positions from '../views/Positions.vue'
import Settings from '../views/Settings.vue'
import AllSkills from '../views/AllSkills.vue'
import Languages from '@/views/Languages.vue'
import { useCookie } from '@/composables/cookies'
import { useUserStore } from '@/stores/user'
import { updateAccessToken } from '@/service/userData'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'Employees',
      component: HomeView,
      meta: {
        isAuth: true,
        breadcrumb: 'Employees'
      }
    },
    {
      path: '/users',
      name: 'Users',
      meta: {
        isAuth: true,
        hasTabs: true,
        breadcrumb: 'Employees',
        hasBreadcrumbs: true
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
          meta: { breadcrumb: 'CVs' }
        },
        {
          path: ':id/skills',
          name: 'UserSkills',
          component: UserSkills,
          meta: { breadcrumb: 'Skills' }
        },
        {
          path: ':id/languages',
          name: 'UserLanguages',
          component: UserLanguages,
          meta: { breadcrumb: 'Languages' }
        }
      ]
    },

    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsAll,
      meta: {
        isAuth: true,
        breadcrumb: 'Projects'
      }
    },
    {
      path: '/cvs',
      name: 'CVs',
      children: [
        { path: '', name: 'CVs', component: Cvs },
        { path: ':id', name: 'CvId', component: CvId },
        { path: ':id/preview', name: 'CvPreview', component: Preview },
        { path: ':id/projects', name: 'CvProjects', component: Projects },
        { path: ':id/skills', name: 'CvSkills', component: Skills }
      ],
      meta: {
        isAuth: true,
        breadcrumb: 'CVs'
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
        breadcrumb: 'Skills'
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        isAuth: true,
        breadcrumb: 'Settings'
      }
    },
    {
      path: '/positions',
      name: 'Positions',
      component: Positions,
      meta: {
        isAuth: true,
        breadcrumb: 'Positions'
      }
    },
    {
      path: '/departments',
      name: 'Departments',
      component: Departments,
      meta: {
        isAuth: true,
        breadcrumb: 'Departments'
      }
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Languages,
      meta: {
        isAuth: true,
        breadcrumb: 'Languages'
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const userStore = useUserStore()
    userStore.initializeAuth()

    const requireAuth = to.meta.isAuth
    const { getCookies } = useCookie()
    const accessToken = getCookies('accessToken')
    const refreshToken = getCookies('refreshToken')

    if (to.path === '/') {
      return next('/users')
    }
    if (requireAuth) {
      if (!accessToken && !refreshToken) next('/auth/login')
      if (!accessToken && refreshToken) {
        next()
      } else next()
    } else {
      if (!accessToken && !refreshToken) next()
      if (!accessToken && !refreshToken) next()
      if (!accessToken && refreshToken) {
        console.log('no access')
        const updatedAccessToken: unknown = await updateAccessToken()
        if (updatedAccessToken) {
          next(from.fullPath)
        } else {
          next()
        }
        return
      } else next(from.fullPath)
    }
  } catch (e) {
    console.log(e)
  }
})

export default router

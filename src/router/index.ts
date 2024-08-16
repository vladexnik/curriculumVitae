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
import ComponentsUsage from '@/components/ComponentsUsage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/users',
      name: 'Users',
      children: [
        { path: '', name: 'Users', component: Users },
        { path: ':id', name: 'UserId', component: UserId },
        { path: ':id/cvs', name: 'UserCvs', component: UserCvs },
        { path: ':id/skills', name: 'UserSkills', component: UserSkills },
        {
          path: ':id/languages',
          name: 'UserLanguages',
          component: UserLanguages
        }
      ],
      meta: {
        isAuth: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsAll,
      meta: {
        isAuth: true
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
        isAuth: true
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
        isAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/positions',
      name: 'Positions',
      component: Positions,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/departments',
      name: 'Departments',
      component: Departments,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/languages',
      name: 'Languages',
      component: Languages,
      meta: {
        isAuth: true
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

import { createRouter, createWebHistory } from 'vue-router'
import { useCookies } from 'vue3-cookies'
import { updateAccessToken } from '../stores/user'
//users routes
import Users from '../views/users/Index.vue'
import UserId from '../views/users/id/Index.vue'
import UserCvs from '../views/users/id/UserCvs.vue'
import UserSkills from '../views/users/id/UserSkills.vue'
import UserLanguages from '../views/users/id/UserLanguages.vue'

//auth routes
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Form from '../views/auth/Form.vue'

//cvs routes
import Cvs from '../views/cvs/Index.vue'
import CvId from '../views/cvs/id/Index.vue'
import Preview from '../views/cvs/id/Preview.vue'
import Projects from '../views/cvs/id/Projects.vue'
import Skills from '../views/cvs/id/Skills.vue'

//common routes
import Departments from '../views/Departments.vue'
import Positions from '../views/Positions.vue'
import Settings from '../views/Settings.vue'
import AllSkills from '../views/AllSkills.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      component: HomeView,
      children: [
        { path: '', component: Users },
        { path: '/:id', component: UserId },
        { path: '/:id/cvs', component: UserCvs },
        { path: '/:id/skills', component: UserSkills },
        { path: '/:id/languages', component: UserLanguages }
      ],
      meta: {
        isAuth: true
      }
    },
    {
      path: '/cvs',
      name: 'cvs',
      children: [
        { path: '', component: Cvs },
        { path: '/:id', component: CvId },
        { path: '/:id/preview', component: Preview },
        { path: '/:id/projects', component: Projects },
        { path: '/:id/skills', component: Skills }
      ],
      meta: {
        isAuth: true
      }
    },
    {
      path: '/auth/login',
      name: 'login',
      component: Login
    },
    {
      path: '/auth/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/skills',
      name: 'allSkills',
      component: AllSkills,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/positions',
      name: 'positions',
      component: Positions,
      meta: {
        isAuth: true
      }
    },
    {
      path: '/departments',
      name: 'departments',
      component: Departments,
      meta: {
        isAuth: true
      }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {
    const requireAuth = to.meta.isAuth
    const { cookies } = useCookies()
    const accessToken = cookies.get('accessToken')
    const refreshToken = cookies.get('refreshToken')

    if (requireAuth) {
      if (!accessToken && !refreshToken) next('/login')
      // if (!accessToken && refreshToken) {
      //     const updatedAccessToken = await updateAccessToken();
      //     if (updatedAccessToken) {
      //       next();
      //       } else {
      //       next(from.path);
      //       }
      // }
      next()
    } else {
      if (!accessToken && !refreshToken) next()
      // if (!accessToken && refreshToken) {
      //   const updatedAccessToken = await updateAccessToken();
      //   if (updatedAccessToken) {
      //     next(from.path);
      //     } else {
      //     next();
      //     }
      // }
      next(from.fullPath)
    }
  } catch (e) {
    console.log(e)
  }
})

export default router

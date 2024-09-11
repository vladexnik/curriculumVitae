import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useCookie } from '@/composables/cookies'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

const { getCookies } = useCookie()

router.beforeEach(async (to, from, next) => {
  try {
    const requireAuth = to.meta.isAuth
    const accessToken = getCookies('accessToken')
    const refreshToken = getCookies('refreshToken')

    if (to.path === '/' && from.path !== '/users') {
      return next('/users')
    }

    if (requireAuth) {
      if (!accessToken && !refreshToken) next('/auth/login')
      if (!accessToken && refreshToken) {
        next()
      } else next()
    } else {
      if (!accessToken && !refreshToken) next()
    }
  } catch (e) {
    console.log(e)
  }
})

export default router

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

//common routes
import Departments from '../views/Departments.vue'
import Positions from '../views/Positions.vue'
import Settings from '../views/Settings.vue'
import AllSkills from '../views/AllSkills.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'users',
      children: [
        { path: '', component: Users },
        { path: '/:id', component: UserId },
        { path: '/:id/cvs', component: UserCvs },
        { path: '/:id/skills', component: UserSkills },
        { path: '/:id/languages', component: UserLanguages },
      ],
    },
    {
      path: '/cvs',
      name: 'cvs',
      children: [
      { path: '', component: Cvs },
      { path: '/:id', component: CvId },
      { path: '/:id/preview', component: Preview },
      { path: '/:id/projects', component: Projects },
      { path: '/:id/skills', component: Skills },
    ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/skills',
      name: 'allSkills',
      component: AllSkills
    },
    {
      path: '/settings',
      name: 'settings',
      component: Settings
    },
    {
      path: '/positions',
      name: 'positions',
      component: Positions
    },
    {
      path: '/departments',
      name: 'departments',
      component: Departments
    },
  ]
})

export default router

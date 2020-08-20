import Vue from 'vue'
import VueRouter from 'vue-router'

// Global Components for Auth and Dashboard
import Common from '@/apps/common/route'

import store from '../store'

Vue.use(VueRouter)

const routes = [...Common]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.loggedIn) {
      next()
      return
    }
    next('/login')
  } else if (to.matched.some(record => record.meta.notRequiresAuth)) {
    console.log(to, store.getters.loggedIn)
    if (store.state.loggedIn) {
      next('/dashboard')
      return
    }
    next()
  } else {
    next()
  }
})
export default router

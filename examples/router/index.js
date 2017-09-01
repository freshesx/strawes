import Vue from 'vue'
import VueRouter from 'vue-router'
import sign from './sign'
import dashboard from './dashboard'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/sign',
      component: resolve => { require(['../components/sign'], resolve) },
      children: sign
    },
    {
      path: '/dashboard',
      meta: {
        title: '首页'
      },
      component: resolve => { require(['../components/dashboard'], resolve) },
      children: dashboard
    }
  ]
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/login'
import Visit from '@/view/visit'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      name: 'visit',
      component: Visit,
      meta: {
        keepAlive: true
      }
    }
  ]
})

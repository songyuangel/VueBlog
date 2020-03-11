import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/view/login'
import Visit from '@/view/visit'
import Userinfo from '@/view/userinfo'
import Blogsetting from '@/view/blogsetting'
import SettingCategory from '@/view/settingCategory'
import SettingTag from '@/view/settingTag'
import SettingPassword from '@/view/settingPassword'

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
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: Userinfo,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/blogsetting',
      name: 'blogsetting',
      component: Blogsetting,
      meta: {
        keepAlive: true
      },
      redirect: 'blogsetting/settingCategory',
      children: [
        {
          name: 'settingCategory',
          path: 'settingCategory',
          component: SettingCategory,
          meta: {
            keepAlive: true
          }
        }, {
          name: 'settingTag',
          path: 'settingTag',
          component: SettingTag,
          meta: {
            keepAlive: true
          }
        }, {
          name: 'settingPassword',
          path: 'settingPassword',
          component: SettingPassword,
          meta: {
            keepAlive: true
          }
        }

      ]
    }
  ]
})

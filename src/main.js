// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './plugins/element.js' // 这句引入了ElementUI
import {get, post} from './utils/axiosjs' // 引入axios
import qs from 'qs' // 引入qs

Vue.config.productionTip = false
Vue.prototype.get = get
Vue.prototype.post = post
Vue.prototype.qs = qs

/* eslint-disable no-new */

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

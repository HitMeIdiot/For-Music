// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './axios/axios'
import store from './store/store'
import './components'
import util from './public/util'
import * as custom from './public/filter'
import '@/styles/index.scss' // global css

Vue.use(util)
Object.keys(custom).forEach(key => {
  Vue.filter(key, custom[key])
})
Vue.prototype.$ajax = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

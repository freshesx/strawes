import 'babel-polyfill'
import Vue from 'vue'
import env from './env'
import store from './store'
import './human'
import App from './app'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  env,
  store,
  router,
  render: h => h(App)
})

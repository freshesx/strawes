/**
 * Vuex store structure reference:
 * @see(@link https://github.com/vuejs/vuex/tree/dev/examples/shopping-cart)
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import user from './user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  actions,
  getters,
  modules: {
    user
  },
  strict: debug
})

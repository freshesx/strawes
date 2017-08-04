import Vue from 'vue'
import VueHumanEnv from 'vue-human-env'
import config from './config.js'
import configLocal from './config.local.js'

Vue.use(VueHumanEnv, config, configLocal)

export default VueHumanEnv

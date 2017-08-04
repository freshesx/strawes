import Vue from 'vue'
import Human from 'vue-human'
import locales from '../locale'
import core from 'vue-human/suites/core'
import './app.scss'

// Use Human
Vue.use(Human, { locales })
Vue.use(core)

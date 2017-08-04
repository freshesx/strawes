import tokenStorage from './token'
import {
  UPDATE_AUTH_TOKEN,
  CLEAR_AUTH_TOKEN } from '../mutation-types'

export default {
  [UPDATE_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.set(token)
  },
  [CLEAR_AUTH_TOKEN] (state, token) {
    state.token = tokenStorage.remove(token)
  }
}

import { signIn } from '../../axios/user'
import { UPDATE_AUTH_TOKEN } from '../mutation-types'

const namespace = 'user'

export default {
  [`${namespace}.signIn`] ({ commit }, { username, password }) {
    return signIn({ username, password }).then(response => {
      commit(UPDATE_AUTH_TOKEN, response.data)
      return response
    })
  }
}

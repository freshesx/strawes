import tokenStorage from './token'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

const state = {
  /**
   * Token 数据结构
   * @property {object} token                  - token 对象
   * @property {string} token.token_type       - token 类型（Bearer）
   * @property {number} token.expires_in       - 有效时间
   * @property {string} token.access_token     - access token
   * @property {string} token.refresh_token    - refresh token
   */
  token: tokenStorage.get()
}

export default {
  state,
  getters,
  actions,
  mutations
}

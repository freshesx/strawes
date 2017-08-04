import BaseAxiosHelper from 'vue-human/utils/AxiosHelper'
import env from '../env'
import router from '../router'
import store from '../store'

export default class AxiosHelper extends BaseAxiosHelper {
  config () {
    return {
      baseURL: env.get('API'),
      headers: {
        Accept: 'application/json',
        Authorization: `${store.state.user.token.token_type} ${store.state.user.token.access_token}`
      }
    }
  }

  error401 (error) {
    super.$error401(error)
    router.push({ name: 'sign-in' })
  }

  error404 (error) {
    super.$error404(error)
  }
}

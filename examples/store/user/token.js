import Vue from 'vue'

const TOKEN_NAME = `${Vue.env.get('STORAGE_PREFIX')}TOKEN`

export default {
  get () {
    const token = window.JSON.parse(window.localStorage.getItem(TOKEN_NAME))
    const expires = new Date(token ? token.expires : undefined)
    const now = new Date()

    return expires > now && token ? token : this.remove()
  },
  set (token) {
    const now = new Date()
    const expires = new Date(now.getTime() + 1000 * 60 * 60 * 24 * 365)

    window.localStorage.setItem(TOKEN_NAME, window.JSON.stringify({ ...token, expires }))
    return this.get()
  },
  remove () {
    window.localStorage.removeItem(TOKEN_NAME)
    return {}
  }
}

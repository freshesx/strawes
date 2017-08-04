import env from '../env'
import axios from './axios'
import isUndefined from 'lodash/isUndefined'

export function signIn (params = {}) {
  if (isUndefined(params.username)) {
    console.warn('缺少 username')
  }

  if (isUndefined(params.password)) {
    console.warn('缺少 password')
  }

  return axios({
    method: 'POST',
    url: `/oauth/token`,
    data: {
      grant_type: 'password',
      client_id: env.get('CLIENT_ID'),
      client_secret: env.get('CLIENT_SECRET'),
      username: params.username,
      password: params.password
    }
  })
}

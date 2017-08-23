import axios from './axios'

export function listMovies (params = {}) {
  return axios({
    method: 'GET',
    url: `/api/movies`,
    params
  })
}

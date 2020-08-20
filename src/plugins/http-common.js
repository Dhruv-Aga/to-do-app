/* 
 * Axios global configuration, creating a single instance
 * to be used everywhere
*/
import axios from 'axios'
import store from '@/store'

var baseURL = store.state.baseURL + 'api/'

const instance = axios.create({
  baseURL: baseURL
})

if (store.state.token) {
  console.log(store.state)
  instance.defaults.headers = {
    authorization: 'Token ' + store.state.token
  }
}

instance.interceptors.request.use(
  function (config) {
    store.commit('loader', true)
    return config
  },
  function (error) {
    store.commit('loader', false)
    return Promise.reject(error)
  }
)

instance.interceptors.response.use(
  function (response) {
    store.commit('loader', false)
    return response
  },
  function (error) {
    store.commit('loader', false)
    return Promise.reject(error)
  }
)
export default instance

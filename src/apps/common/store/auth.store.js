/* 
 * Auth APIs Store (Sign Up, Login) 
*/
import HTTP from '@/plugins/http-common'
import store from '@/store'

// Details for Specific Module
var store_path = "/v1/users"
var api = {}

api.signup_api = async function (data) {
  console.log(data)
  var res = await HTTP.post(store_path + '/signup/', {
    user: data
  }).catch(function (error) {
    store.dispatch('showError', error.response)
    return { error: true }
  })
  if (!res.error) store.dispatch('showMsg', { msg: res.data.msg, show: true})
}

api.login_api = async function (data) {
  var res = await HTTP.post(store_path + '/login', {
    user: data
  }).catch(function (error) {
    store.dispatch('showError', error.response)
    return { error: true }
  })
  if (res) {
    const now = new Date()
    var expirationDate = new Date(
      now.getTime() + res.data.user.expiresIn * 1000
    )
    store.dispatch('login', {
      token: res.data.user.token,
      userId: res.data.user.localId,
      expirationDate: expirationDate,
      user: res.data.name
    })
    return res.data
  } 
}
export default api

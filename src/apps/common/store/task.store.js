/* 
 * Task APIs Store (Create, update, delete, get) 
*/
import HTTP from '@/plugins/http-common'
import store from '@/store'

var store_path = "/v1/tasks"
var api = {}

api.save_task = async function (data) {
    var res = await HTTP.post(store_path + '/', {
        task: data
    }).catch((error) => {
        store.dispatch('showError', error.response)
        return { error: true }
    })
    if (!res.error) {
        store.dispatch('showMsg', { msg: res.data.msg, show: true })
        return res.data
    }
    return res
}

api.update_task = async function (data) {
    var res = await HTTP.put(store_path + '/', {
        task: data
    }).catch(function (error) {
        store.dispatch('showError', error.response)
        return { error: true }
    })
    if (res) {
        return res.data
    }
}

api.delete_task = async function (data) {
    var res = await HTTP.delete(store_path + '/',   {
        data: data
      }).catch(function (error) {
        store.dispatch('showError', error.response)
        return { error: true }
    })
    if (!res.error) {
        store.dispatch('showMsg', { msg: res.data.msg, show: true })
        return res.data
    }
    return res
}

api.get_task = async function (data) {
    var res = await HTTP.get(store_path + '/', {
        params: data
    }).catch(function (error) {
        store.dispatch('showError', error.response)
        return { error: true }
    })
    if (res) {
        return res.data
    }
    return res
}
export default api

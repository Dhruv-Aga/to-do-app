import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import HTTP from '@/plugins/http-common'

Vue.use(Vuex)

// Storage strategy
const vuexStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

// Default State Object 
const getDefaultState = () => {
  return {
    params: {},
    token: null,
    baseURL: 'http://127.0.0.1:3000/',
    baseImageURL: 'http://127.0.0.1:3000/',
    userId: 'Guest User',
    user: null,
    expirationDate: null,
    loggedIn: false,
    loader: false,
    snackbar: {
      show: false,
      color: 'primary'
    }
  }
}

// Creating Vue Store 
export default new Vuex.Store({
  plugins: [vuexStorage.plugin],
  state: getDefaultState(),
  mutations: {
    login (state, userData) {
      state.token = userData.token
      state.userId = userData.userId
      state.expirationDate = userData.expirationDate
      state.user = userData.user
      state.loggedIn = true
      HTTP.defaults.headers = {
        authorization: 'Token ' + userData.token
      }
    },
    logout (state) {
      Object.assign(state, getDefaultState())
    },
    loader (state, payload) {
      state.loader = payload
    },
    snackbar (state, payload) {
      state.snackbar = payload
    },
    params (state, payload) {
      state.params = payload
    }
  },
  actions: {
    login ({ commit }, authData) {
      commit('login', authData)
    },
    logout ({ commit }) {
      commit('logout')
    },
    showMsg ({ commit }, snackbar) {
      commit('snackbar', snackbar)
    },
    showError ({ commit }, error) {
      console.log(error)
      var msg = ''
      if (error.data.error === 1) {
        msg = 'Error'
        msg += ': ' + error.data.msg
      } else {
        msg = 'Message'
        msg += ': ' + error.data.msg       
      }
      commit('snackbar', {
        msg: msg,
        show: true
      })
    }
  }
})

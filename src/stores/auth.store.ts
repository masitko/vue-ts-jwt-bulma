
import { defineStore } from 'pinia'

// import AuthService from '../services/auth.service'

const user = JSON.parse(localStorage.getItem('user') || '""')
const initialState: IAUthState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export const useAuthStore = defineStore('auth', {
  state: () => initialState,
  getters: {
    getUser: (state) => state.user,
    isLoggedIn: (state) => state.status.loggedIn,
  },
  actions: {
    loginSuccess(user: IUser) {
      this.status.loggedIn = true
      this.user = user
    },
    loginFailure() {
      this.status.loggedIn = false
      this.user = null
    },
    logout() {
      this.status.loggedIn = false
      this.user = null
    },
    registerSuccess() {
      this.status.loggedIn = false
    },
    registerFailure() {
      this.status.loggedIn = false
    }
  }

});
/*
export const auth = {
  namespaced: true,
  state: initialState,
  old: {
    login(user: IUser) {
      return AuthService.login(user).then(
        (user) => {
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        (error) => {
          commit('loginFailure')
          return Promise.reject(error)
        }
      )
    },
    logout({ commit }) {
      AuthService.logout()
      commit('logout')
    },
    register({ commit }, user) {
      return AuthService.register(user).then(
        (response) => {
          commit('registerSuccess')
          return Promise.resolve(response.data)
        },
        (error) => {
          commit('registerFailure')
          return Promise.reject(error)
        }
      )
    }
  },

}
*/

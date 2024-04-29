import axios from 'axios';

import { onMounted } from 'vue'

import { useAuthStore } from '@/stores/auth.store';

const API_URL = 'http://localhost:21057/api/auth/';


export function useAuthService() {

  onMounted(() => {
    console.log('AuthService.onMounted')
  });

  function getAuthHeader(): Headers {
    const user = JSON.parse(localStorage.getItem('user') || '""');
    const headers = new Headers();
    if (user && user.accessToken) {
      headers.set('Authorization', 'Bearer ' + user.accessToken);
    }
    return headers;
  }

  function login(user: Partial<IUser>) {
    return axios
      .post(API_URL + 'signin', {
        username: user.username,
        password: user.password
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        useAuthStore().loginSuccess(response.data);
        return response.data;
      }).catch((error) => {
        useAuthStore().loginFailure();
        console.log(error);
      });
  }

  function logout() {
    useAuthStore().logout();
    localStorage.removeItem('user');
  }

  function register(user: IUser) {
    return axios.post(API_URL + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then((response) => {
      console.log(response.data);
      useAuthStore().registerSuccess();
    }).catch((error) => {
      console.log(error);
      useAuthStore().registerFailure();
    })
  }

  return {
    login,
    logout,
    register,
    getAuthHeader
  }
}

// export default new AuthService();

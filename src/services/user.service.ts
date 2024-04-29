// import axios from 'axios';
// import authHeader from './auth-header';
import { useAuthService } from './auth.service';

const API_URL = 'http://localhost:21057/api/test/';

class UserService {

  getPublicContent() {
    return fetch(API_URL + 'all');
  }

  getUser(userId: string) {
    return fetch(API_URL + `user/${userId}`, { headers: useAuthService().getAuthHeader() });
  }

  updateUser(userId: string, data: Object) {
    const headers = useAuthService().getAuthHeader();
    headers.set('Content-Type', 'application/json');
    return fetch(API_URL + `user/${userId}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(data)
    });
  }

  getAllUsers(search: string = '') {
    return fetch(API_URL + `users/${search}`, { headers: useAuthService().getAuthHeader() });
  }

  getUserBoard() {
    return fetch(API_URL + 'user', { headers: useAuthService().getAuthHeader() });
  }

  getModeratorBoard() {
    return fetch(API_URL + 'mod', { headers: useAuthService().getAuthHeader() });
  }

  getAdminBoard() {
    return fetch(API_URL + 'admin', { headers: useAuthService().getAuthHeader() });
  }
}

export default new UserService();

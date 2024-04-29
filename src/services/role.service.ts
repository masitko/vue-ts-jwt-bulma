// import axios from 'axios';
import { useAuthService } from './auth.service'

const API_URL = 'http://localhost:21057/api/test/'

class RoleService {
  getAllRoles() {
    return fetch(API_URL + 'roles', { headers: useAuthService().getAuthHeader() })
  }
}

export default new RoleService()

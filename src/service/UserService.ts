import ApiService from './ApiService';

class UserService {
  isLogin() {
    return !!localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  getAccessToken() {
    return localStorage.getItem('token');
  }

  getOrders(params: { [key: string]: any }) {
    return ApiService.requestWithAuth(
      'GET',
      '/customers/contact/orders',
      params
    );
  }
}

export default new UserService();

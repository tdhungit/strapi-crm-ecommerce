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

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return ApiService.requestWithAuth(
      'POST',
      '/customers/contact/change-password',
      {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      }
    );
  }
}

export default new UserService();

import ApiService from './ApiService';

export interface RegisterDataType {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
  login_provider?: string;
  login_provider_id?: string;
  autoLogin?: boolean;
  avatar?: string;
  firebaseToken?: string;
}

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

  register(formData: RegisterDataType) {
    return ApiService.request('POST', '/customers/contact/register', formData);
  }
}

export default new UserService();

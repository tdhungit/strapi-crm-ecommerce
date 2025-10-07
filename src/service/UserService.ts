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
}

export default new UserService();

import axios from 'axios';

class ApiService {
  private readonly API_URL = process.env.NEXT_PUBLIC_API_URL;

  async request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    data?: any
  ) {
    const res = await axios.request({
      method,
      baseURL: this.API_URL + '/api' + url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      data: method === 'POST' || method === 'PUT' ? data : undefined,
      params: method === 'GET' ? data : undefined,
    });
    return res.data;
  }
}

export default new ApiService();

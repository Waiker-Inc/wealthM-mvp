import axios from 'axios';
import qs from 'qs';

const api = axios.create({
  baseURL: 'https://beta-iapi.waiker.ai',
  headers: {
    'Content-Type': 'application/json',
    lang: 'en',
    'Accept-Language': 'en',
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

api.interceptors.response.use((response) => {
  return response.data;
});

export default api;

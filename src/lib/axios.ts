import axios from 'axios';
import qs from 'qs';

const isDev = import.meta.env.DEV;

const api = axios.create({
  baseURL: isDev ? '/iapi' : import.meta.env.VITE_IAPI_URL,
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

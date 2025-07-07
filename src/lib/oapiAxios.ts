import axios from 'axios';
import qs from 'qs';

export const oapi = axios.create({
  baseURL: import.meta.env.VITE_OAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    lang: 'en',
    'Accept-Language': 'en',
    'Accept-Currency': 'USD',
    'Accept-Country': 'US',
    // 'Waiker-Product-Key': import.meta.env.VITE_OAPI_PRODUCT_KEY,
    // Authorization: `Bearer ${import.meta.env.VITE_OAPI_JWT}`,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

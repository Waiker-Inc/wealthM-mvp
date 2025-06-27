import axios from "axios";
import qs from "qs";

export const oapi = axios.create({
  baseURL: "https://beta-oapi.waiker.ai",
  headers: {
    "Content-Type": "application/json",
    lang: "ko",
    "Accept-Language": "ko",
    "Accept-Currency": "KRW",
    "Accept-Country": "US",
    "Waiker-Product-Key": import.meta.env.VITE_OAPI_PRODUCT_KEY,
    Authorization: `Bearer ${import.meta.env.VITE_OAPI_JWT}`,
  },
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

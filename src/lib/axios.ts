import axios from "axios";

const api = axios.create({
  baseURL: "http://10.40.12.252:8230",
  headers: {
    "Content-Type": "application/json",
    lang: "ko",
    "Accept-Language": "ko",
  },
});

export default api;

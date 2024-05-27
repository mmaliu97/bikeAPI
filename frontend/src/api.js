import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const apiUrl = "https://c7889c0d-220d-4dd0-b64a-605971ef4c3d-dev.e1-us-cdp-2.choreoapis.dev/bikeapi/backend/rest-api-be2/v1.0";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // like python f string
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
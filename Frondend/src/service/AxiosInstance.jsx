import axios from "axios";
import { backendUrl } from "./backendUrl";

const admin_Api = axios.create({
  baseURL: backendUrl,
});

admin_Api.interceptors.request.use(
  (config) => {
    const token = JSON.parse(sessionStorage.getItem("admin-token"));
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default admin_Api;

import axios from "axios";
import { backendUrl } from "./backendUrl";

const admin_Api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

admin_Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default admin_Api;

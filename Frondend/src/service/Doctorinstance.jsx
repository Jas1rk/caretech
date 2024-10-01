import axios from "axios";
import { backendUrl } from "./backendUrl";

const doctor_Api = axios.create({
  baseURL: backendUrl,
  withCredentials: true,
});

doctor_Api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default doctor_Api;

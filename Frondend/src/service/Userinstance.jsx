import axios from "axios";
import { backendUrl } from "./backendUrl";

const user_Api = axios.create({
  baseURL: backendUrl,
});

user_Api.interceptors.request.use(
  (config) => {
    const userToken = JSON.parse(sessionStorage.getItem("usertoken"));
    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default user_Api;

import axios from "axios";
import { backendUrl } from "./backendUrl";

const user_Api = axios.create({
  baseURL: backendUrl,
  withCredentials:true
});

user_Api.interceptors.request.use(
  (config) => {
    console.log("gettting confid",config)
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default user_Api;

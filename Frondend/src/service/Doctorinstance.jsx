import axios from "axios";
import { backendUrl } from "./backendUrl";

const doctor_Api = axios.create({
  baseURL: backendUrl,
});

doctor_Api.interceptors.request.use(
  (config) => {
    const doctorToken = JSON.parse(sessionStorage.getItem("doctor-token"));
    if (doctorToken) {
      config.headers["Authorization"] = `Bearer ${doctorToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default doctor_Api;

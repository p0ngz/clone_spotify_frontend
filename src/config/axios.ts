import axios from "axios";
import { env } from "./env";

export const axiosInstance = axios.create({
  baseURL: `${env.VITE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorThrown = {
      status: err.response?.status,
      message: err.response?.data?.message || err.message,
    };

    return Promise.reject(errorThrown);
  },
);

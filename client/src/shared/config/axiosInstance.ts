import axios, {
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

export const API_URL = "http://localhost:5000/api";

// allow to get server sended cookies
export const axiosInstance = axios.create({
    withCredentials: true,
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
        "accessToken"
    )}`;
    return config;
});

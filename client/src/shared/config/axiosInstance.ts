import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
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

axiosInstance.interceptors.response.use(
    (config: AxiosResponse) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status == 401 &&
            !error.config._isRetry &&
            !originalRequest.url.includes("/refresh")
        ) {
            originalRequest._isRetry = true;
            try {
                const response = await axiosInstance.get(`${API_URL}/refresh`);
                localStorage.setItem("accessToken", response.data.accessToken);
                return axiosInstance.request(originalRequest);
            } catch (error) {
                console.log("Unauthorized");
            }
        }
        throw error;
    }
);

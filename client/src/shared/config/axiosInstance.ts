import axios from "axios";

// allow to get server sended cookies
export const axiosInstance = axios.create({
    withCredentials: true,
});

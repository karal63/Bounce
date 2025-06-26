import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";

export const apiLogout = async () => {
    await axiosInstance.get(`${API_URL}/logout`);
};

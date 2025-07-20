import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiUnbanUser = async (id: number) => {
    await axiosInstance.post(`${API_URL}/unban-member/${id}`);
};

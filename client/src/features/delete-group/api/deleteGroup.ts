import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiDeleteGroup = async (groupId: string) => {
    await axiosInstance.delete(`${API_URL}/delete-group/${groupId}`);
};

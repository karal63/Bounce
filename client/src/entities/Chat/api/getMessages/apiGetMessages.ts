import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiGetMessages = async (groupId) => {
    const messages = await axiosInstance.get(`${API_URL}/messages/${groupId}`);
    return messages;
};

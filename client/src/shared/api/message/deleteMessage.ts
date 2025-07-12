import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiDeleteMessage = async (messageId: number) => {
    await axiosInstance.delete(`${API_URL}/delete-message/${messageId}`);
};

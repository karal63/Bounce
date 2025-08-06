import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiAddReaction = async (messageId: string, stickerId: string) => {
    await axiosInstance.post(`${API_URL}/add-reaction/${messageId}`, {
        stickerId,
    });
};

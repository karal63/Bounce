import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiDeleteReaction = async (reactionId: string) => {
    await axiosInstance.delete(`${API_URL}/delete-reaction/${reactionId}`);
};

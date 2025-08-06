import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { MessageWithName } from "@/shared/types/Message";

export const apiDeleteReaction = async (
    message: MessageWithName,
    reactionId: string
) => {
    await axiosInstance.post(`${API_URL}/delete-reaction/${reactionId}`, {
        message,
    });
};

import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { MessageWithName } from "@/shared/types/Message";
import type { Reaction } from "@/shared/types/Reaction";

export const apiHandleClick = async (
    message: MessageWithName,
    reaction: Reaction
) => {
    await axiosInstance.post(`${API_URL}/handle-reaction-click`, {
        message,
        reaction,
    });
};

import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/shared/types/Message";

export const apiSendGroupMessage = async (
    message: ReadyMessage,
    room: string
) => {
    const res = await axiosInstance.post(`${API_URL}/send-group-message`, {
        message,
        room,
    });
    return res;
};

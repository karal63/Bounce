import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/shared/types/Message";

export const apiSendPrivateMessage = async (
    message: ReadyMessage,
    room: number
) => {
    const res = await axiosInstance.post(`${API_URL}/send-private-message`, {
        message,
        room,
    });
    return res;
};

import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/shared/types/Message";

export const apiSendDirectMessage = async (
    message: ReadyMessage,
    room: number
) => {
    const res = await axiosInstance.post(`${API_URL}/send-direct-message`, {
        message,
        room,
    });
    return res;
};

import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";

export const apiSendMessage = async (message: ReadyMessage, room: string) => {
    const res = await axiosInstance.post(`${API_URL}/send-message`, {
        message,
        room,
    });
    return res;
};

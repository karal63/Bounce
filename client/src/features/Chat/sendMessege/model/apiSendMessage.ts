import { axiosInstance, API_URL } from "@/shared/config/axiosInstance";
import type { ReadyMessage } from "@/features/Chat/sendMessege/model/types/Message";

export const apiSendMessage = async (message: ReadyMessage) => {
    const res = await axiosInstance.post(`${API_URL}/send-message`, {
        message,
    });
    return res;
};

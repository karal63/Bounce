import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { CurrentRoom } from "@/shared/types/CurrentRoom";

export const apiGetAttachments = async (
    currentRoom: string
): Promise<AxiosResponse> => {
    const messages = await axiosInstance.get(
        `${API_URL}/attachments/${currentRoom}`
    );
    return messages;
};

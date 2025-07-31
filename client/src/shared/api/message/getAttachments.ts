import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { CurrentRoom } from "@/shared/types/CurrentRoom";
import type { Attachment } from "@/shared/types/Attachment";

export const apiGetAttachments = async (
    currentRoom: string
): Promise<AxiosResponse<Attachment[]>> => {
    const messages = await axiosInstance.get(
        `${API_URL}/attachments/${currentRoom}`
    );
    return messages;
};

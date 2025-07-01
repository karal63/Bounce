import type { Message } from "@/features/Chat/sendMessege/model/types/Message";
import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";

export const apiGetMessages = async (
    groupId: string
): Promise<AxiosResponse<Message[]>> => {
    const messages = await axiosInstance.get(`${API_URL}/messages/${groupId}`);
    return messages;
};

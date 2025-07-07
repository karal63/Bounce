import type { MessageWithName } from "@/shared/types/Message";
import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";

export const apiGetMessages = async (
    groupId: number
): Promise<AxiosResponse<MessageWithName[]>> => {
    const messages = await axiosInstance.get(`${API_URL}/messages/${groupId}`);
    return messages;
};

import type { MessageWithName } from "@/shared/types/Message";
import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { CurrentRoom } from "@/shared/types/CurrentRoom";

export const apiGetMessages = async (
    currentRoom: CurrentRoom,
    userId: number
): Promise<AxiosResponse<MessageWithName[]>> => {
    console.log(currentRoom, userId);
    const messages = await axiosInstance.get(
        `${API_URL}/messages/${userId}/${currentRoom.type}/${currentRoom.id}`
    );
    return messages;
};

import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { MessageWithName } from "@/shared/types/Message";
import type { Reaction } from "@/shared/types/Reaction";
import type { AxiosResponse } from "axios";

export const apiAddReaction = async (
    message: MessageWithName,
    stickerId: string
): Promise<AxiosResponse<Reaction>> => {
    const newReaction = await axiosInstance.post(`${API_URL}/add-reaction`, {
        message,
        stickerId,
    });
    return newReaction;
};

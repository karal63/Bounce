import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Reaction } from "@/shared/types/Reaction";
import type { AxiosResponse } from "axios";

export const apiAddReaction = async (
    messageId: string,
    stickerId: string
): Promise<AxiosResponse<Reaction>> => {
    const newReaction = await axiosInstance.post(
        `${API_URL}/add-reaction/${messageId}`,
        {
            stickerId,
        }
    );
    return newReaction;
};

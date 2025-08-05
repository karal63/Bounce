import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { Reaction } from "@/shared/types/Reaction";

export const apiGetReactions = async (
    currentRoom: string
): Promise<AxiosResponse<Reaction[]>> => {
    const reactions = await axiosInstance.get(
        `${API_URL}/reactions/${currentRoom}`
    );
    return reactions;
};

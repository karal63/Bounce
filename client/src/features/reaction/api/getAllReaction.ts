import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Reaction } from "@/shared/types/Reaction";
import type { AxiosResponse } from "axios";

export const apiGetAllReactions = async (
    roomId: string
): Promise<AxiosResponse<Reaction[]>> => {
    const reactions = await axiosInstance.get(
        `${API_URL}/get-all-reactions/${roomId}`
    );
    return reactions;
};

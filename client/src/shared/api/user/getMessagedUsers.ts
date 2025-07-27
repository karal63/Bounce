import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { MessagedUser } from "@/shared/types/MessagedUser";
import type { AxiosResponse } from "axios";

export const apiGetMessagedUsers = async (
    userId: string
): Promise<AxiosResponse<MessagedUser[]>> => {
    const users = await axiosInstance.get(
        `${API_URL}/get-messaged-users/${userId}`
    );
    return users;
};

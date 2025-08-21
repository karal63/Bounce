import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Group } from "@/shared/types/Group";
import type { AxiosResponse } from "axios";

export const apiJoinGroup = async (
    link: string,
    userId: string
): Promise<AxiosResponse<Group>> => {
    const group = await axiosInstance.post(`${API_URL}/join-group/${link}`, {
        userId,
    });
    return group;
};

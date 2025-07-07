import type { Group } from "@/shared/types/Group";
import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";

export const apiCreateGroup = async (
    name: string,
    ownerId: number,
    description: string
): Promise<AxiosResponse<Group>> => {
    const newGroup = await axiosInstance.post(`${API_URL}/create-group`, {
        name,
        ownerId,
        description,
    });
    return newGroup;
};

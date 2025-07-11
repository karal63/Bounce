import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Group } from "@/shared/types/Group";
import type { AxiosResponse } from "axios";

export const apiGetGroups = async (
    userId: number
): Promise<AxiosResponse<Group[]>> => {
    const groups = await axiosInstance.get(`${API_URL}/groups/${userId}`);
    return groups;
};

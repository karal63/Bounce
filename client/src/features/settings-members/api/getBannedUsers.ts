import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { MemberWithName } from "@/shared/types/Member";
import type { AxiosResponse } from "axios";

export const apiGetBannedUsers = async (
    groupId: number
): Promise<AxiosResponse<MemberWithName[]>> => {
    const members = await axiosInstance.get(
        `${API_URL}/banned-members/${groupId}`
    );
    return members;
};

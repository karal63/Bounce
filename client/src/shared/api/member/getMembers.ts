import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { MemberWithName } from "@/entities/member/types/Member";

export const getAllMembers = async (
    senderId: string,
    groupId: number
): Promise<AxiosResponse<MemberWithName[]>> => {
    const members = await axiosInstance.post(`${API_URL}/members/${groupId}`, {
        senderId,
    });
    return members;
};

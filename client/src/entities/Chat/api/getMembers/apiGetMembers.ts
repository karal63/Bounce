import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AxiosResponse } from "axios";
import type { Member } from "@/entities/Chat/model/types/Member";

export const getAllMembers = async (
    senderId: string,
    groupId: string
): Promise<AxiosResponse<Member[]>> => {
    const members = await axiosInstance.post(`${API_URL}/members/${groupId}`, {
        senderId,
    });
    return members;
};

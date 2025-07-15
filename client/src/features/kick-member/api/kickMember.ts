import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiKickMember = async (memberId: number) => {
    await axiosInstance.delete(`${API_URL}/kick-member/${memberId}`);
};

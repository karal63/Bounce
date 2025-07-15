import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiBanMember = async (memberId: number, banReason: string) => {
    await axiosInstance.post(`${API_URL}/ban-member`, { memberId, banReason });
};

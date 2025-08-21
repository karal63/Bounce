import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiBanMember = async (memberId: string, banReason: string) => {
    await axiosInstance.post(`${API_URL}/ban-member`, { memberId, banReason });
};

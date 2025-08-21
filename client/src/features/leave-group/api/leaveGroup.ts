import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiLeaveGroup = async (groupId: string) => {
    await axiosInstance.delete(`${API_URL}/leave-group/${groupId}`);
};

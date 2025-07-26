import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiAddMessagedUser = async (
    userId: string,
    targetUserId: string
) => {
    await axiosInstance.post(`${API_URL}/add-messaged-user/${targetUserId}`, {
        userId,
    });
};

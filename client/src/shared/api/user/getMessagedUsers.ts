import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiGetMessagedUsers = async (userId: string) => {
    const users = await axiosInstance.get(
        `${API_URL}/get-messaged-users/${userId}`
    );
    return users;
};

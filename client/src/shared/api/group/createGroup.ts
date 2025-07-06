import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiCreateGroup = async (
    name: string,
    ownerId: number,
    description: string
) => {
    const newGroup = await axiosInstance.post(`${API_URL}/create-group`, {
        name,
        ownerId,
        description,
    });
    return newGroup;
};

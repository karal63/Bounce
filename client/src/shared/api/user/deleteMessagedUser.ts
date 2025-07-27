import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiDeleteMessagedUser = async (id: string) => {
    await axiosInstance.delete(`${API_URL}/delete-messaged-user/${id}`);
};

import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { User } from "@/shared/types/User";
import type { AxiosResponse } from "axios";

export const apiUpdateUser = async (
    data: Partial<User>
): Promise<AxiosResponse<User>> => {
    return axiosInstance.patch<User>(`${API_URL}/user`, data);
};

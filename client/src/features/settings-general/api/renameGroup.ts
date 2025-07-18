import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiRenameGroup = async (
    prevGroupId: number,
    newGroupName: string
) => {
    await axiosInstance.post(`${API_URL}/rename-group/${prevGroupId}`, {
        newGroupName,
    });
};

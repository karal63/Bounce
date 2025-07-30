import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const apiUploadImage = async (formData: any) => {
    return axiosInstance.post(`${API_URL}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

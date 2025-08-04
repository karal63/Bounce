import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { Attachment } from "@/shared/types/Attachment";
import type { AxiosResponse } from "axios";

export const apiUploadImage = async (
    formData: any
): Promise<AxiosResponse<Attachment>> => {
    return axiosInstance.post(`${API_URL}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

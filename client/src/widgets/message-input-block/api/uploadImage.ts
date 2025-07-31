import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AttachmentToUpload } from "@/shared/types/Attachment";
import type { AxiosResponse } from "axios";

export const apiUploadImage = async (
    formData: any
): Promise<AxiosResponse<AttachmentToUpload>> => {
    return axiosInstance.post(`${API_URL}/upload-image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

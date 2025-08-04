import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { AttachmentToUpload } from "@/shared/types/Attachment";
import { ref } from "vue";

export function useUploadImage() {
    const loading = ref(false);

    const uploadImage = async (file: File): Promise<AttachmentToUpload> => {
        loading.value = true;

        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await axiosInstance.post(
                `${API_URL}/upload-image`,
                formData
            );
            return response.data;
        } finally {
            loading.value = false;
        }
    };

    return { uploadImage, loading };
}

import { useAttachmentsStore } from "@/features/attachments-panel";
import { apiUploadImage } from "../api/uploadImage";

export const useUploadImage = () => {
    const attachmentsStore = useAttachmentsStore();

    const uploadImage = async (file: File | undefined) => {
        try {
            if (!file) return;

            const formData = new FormData();
            formData.append("image", file);

            const image = await apiUploadImage(formData);
            attachmentsStore.attachments.push(image.data);

            if (!attachmentsStore.isAttachmentsPanelOpen)
                attachmentsStore.isAttachmentsPanelOpen = true;
        } catch (error) {
            console.log(error);
        }
    };

    return { uploadImage };
};

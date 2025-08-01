import type { Attachment } from "@/shared/types/Attachment";
import { defineStore } from "pinia";
import { ref } from "vue";

type PreviewImage = {
    isPreviewing: boolean;
    image: Attachment | null;
};

export const useImagePreviewStore = defineStore("imagePreviewStore", () => {
    const previewImage = ref<PreviewImage>({
        isPreviewing: false,
        image: null,
    });

    const openImagePreview = (image: Attachment) => {
        previewImage.value = {
            isPreviewing: true,
            image,
        };
    };

    const closeImagePreview = () => {
        previewImage.value = {
            isPreviewing: false,
            image: null,
        };
    };

    return { previewImage, openImagePreview, closeImagePreview };
});

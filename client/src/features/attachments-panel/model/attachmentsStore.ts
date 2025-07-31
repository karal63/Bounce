import type { AttachmentToUpload } from "@/shared/types/Attachment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttachmentsStore = defineStore("useAttachmentsStore", () => {
    const isAttachmentsPanelOpen = ref(false);
    const attachments = ref<AttachmentToUpload[]>([]);

    return { attachments, isAttachmentsPanelOpen };
});

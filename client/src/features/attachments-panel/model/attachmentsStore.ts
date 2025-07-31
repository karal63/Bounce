import type { Attachment } from "@/shared/types/Attachment";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttachmentsStore = defineStore("useAttachmentsStore", () => {
    const isAttachmentsPanelOpen = ref(false);
    const attachments = ref<Attachment[]>([]);

    return { attachments, isAttachmentsPanelOpen };
});

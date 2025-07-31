import { defineStore } from "pinia";
import { ref } from "vue";

export const useAttachmentsStore = defineStore("useAttachmentsStore", () => {
    const isAttachmentsPanelOpen = ref(false);
    const attachments = ref([]);

    return { attachments, isAttachmentsPanelOpen };
});

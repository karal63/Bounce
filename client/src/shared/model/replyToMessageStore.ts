import { defineStore } from "pinia";
import { ref } from "vue";
import type { MessageWithName } from "../types/Message";

export const useReplyToMessageStore = defineStore("replyToMessageStore", () => {
    const isReplyig = ref(false);
    const replyMessage = ref<MessageWithName | null>(null);

    const setReplyMessage = (message: MessageWithName) => {
        isReplyig.value = true;
        replyMessage.value = message;
    };

    const clearReplyMessage = () => {
        isReplyig.value = false;
        replyMessage.value = null;
    };

    return {
        isReplyig,
        replyMessage,
        setReplyMessage,
        clearReplyMessage,
    };
});

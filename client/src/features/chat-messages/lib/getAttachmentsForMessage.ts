import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const getAttachmentsForMessage = (messageId: string) => {
    const currentChatStore = useCurrentChatStore();
    return currentChatStore.attachments.filter(
        (att) => att.messageId === messageId
    );
};

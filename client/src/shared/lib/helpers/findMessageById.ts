import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const findMessageById = (messageId: string) => {
    const currentChatStore = useCurrentChatStore();

    return currentChatStore.messages.find(
        (message) => message.id === messageId
    );
};

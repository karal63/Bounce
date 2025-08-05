import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const getReactionsForMessage = (messageId: string) => {
    const currentChatStore = useCurrentChatStore();
    return currentChatStore.reactions.filter(
        (reaction) => reaction.messageId === messageId
    );
};

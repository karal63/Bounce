import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const getReactionsForMessage = (messageId: string) => {
    const currentChatStore = useCurrentChatStore();
    console.log(currentChatStore.reactions);
    return currentChatStore.reactions.filter(
        (reaction) => reaction.messageId === messageId
    );
};

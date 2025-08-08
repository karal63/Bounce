import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { Reaction } from "@/shared/types/Reaction";

export const checkIfReacted = (reaction: Reaction) => {
    const currentChatStore = useCurrentChatStore();
    const userReaction = currentChatStore.allReactions.find(
        (r) =>
            r.messageId === reaction.messageId &&
            r.stickerId === reaction.stickerId
    );

    return userReaction;
};

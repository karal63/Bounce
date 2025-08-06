import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiAddReaction } from "../api/addReaction";
import { apiDeleteReaction } from "../api/deleteReaction";
import type { MessageWithName } from "@/shared/types/Message";

export const useReaction = () => {
    const currentChatStore = useCurrentChatStore();
    const addReaction = async (
        message: MessageWithName,
        reactionId: string
    ) => {
        try {
            const newReaction = await apiAddReaction(message, reactionId);
            // currentChatStore.reactions = [
            //     ...currentChatStore.reactions,
            //     newReaction.data,
            // ];
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReaction = async (reactionId: string) => {
        try {
            await apiDeleteReaction(reactionId);
            currentChatStore.reactions = currentChatStore.reactions.filter(
                (reaction) => reaction.id !== reactionId
            );
        } catch (error) {
            console.log(error);
        }
    };

    return { addReaction, deleteReaction };
};

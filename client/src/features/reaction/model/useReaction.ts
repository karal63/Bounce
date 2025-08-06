import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiAddReaction } from "../api/addReaction";

export const useReaction = () => {
    const currentChatStore = useCurrentChatStore();
    const addReaction = async (messageId: string, reactionId: string) => {
        try {
            console.log(messageId, reactionId);
            const newReaction = await apiAddReaction(messageId, reactionId);
            currentChatStore.reactions.push(newReaction.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReaction = async () => [];

    return { addReaction, deleteReaction };
};

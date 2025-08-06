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
            await apiAddReaction(message, reactionId);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReaction = async (
        message: MessageWithName,
        reactionId: string
    ) => {
        try {
            console.log(message, reactionId);
            await apiDeleteReaction(message, reactionId);
        } catch (error) {
            console.log(error);
        }
    };

    return { addReaction, deleteReaction };
};

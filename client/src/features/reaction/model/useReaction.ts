import type { Reaction } from "@/shared/types/Reaction";
import { apiAddReaction } from "../api/addReaction";
import { apiHandleClick } from "../api/handleClick";
import type { MessageWithName } from "@/shared/types/Message";

export const useReaction = () => {
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

    const handleClick = async (
        message: MessageWithName,
        reaction: Reaction
    ) => {
        try {
            await apiHandleClick(message, reaction);
        } catch (error) {
            console.log(error);
        }
    };

    return { addReaction, handleClick };
};

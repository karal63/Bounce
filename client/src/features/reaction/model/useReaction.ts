import { apiAddReaction } from "../api/addReaction";

export const useReaction = () => {
    const addReaction = async (messageId: string, reactionId: string) => {
        try {
            console.log(messageId, reactionId);
            await apiAddReaction(messageId, reactionId);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteReaction = async () => [];

    return { addReaction, deleteReaction };
};

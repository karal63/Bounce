import type { Reaction } from "@/shared/types/Reaction";
import { apiAddReaction } from "../api/addReaction";
import { apiHandleClick } from "../api/handleClick";
import type { MessageWithName } from "@/shared/types/Message";
import { apiGetAllReactions } from "../api/getAllReaction";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const useReaction = () => {
    const currentChatStore = useCurrentChatStore();
    const sessionStore = useSessionStore();

    // adding (deleting) reaction error fixed, now challenge yourself like you are in the job, task is:
    // you already merged pull request and you find out you forgot something, how to push it in feature/reactions
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

    const getAllReactions = async () => {
        if (!currentChatStore.currentRoom.id) return;
        const allReactions = await apiGetAllReactions(
            currentChatStore.currentRoom.id
        );
        currentChatStore.allReactions = allReactions.data.filter(
            (reaction) => reaction.senderId === sessionStore.user?.id
        );
    };

    return { addReaction, handleClick, getAllReactions };
};

import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { apiGetReactions } from "@/shared/api/message/getReactions";

export const useGetReactions = () => {
    const currentChatStore = useCurrentChatStore();
    const sessionStore = useSessionStore();

    const getReactions = async () => {
        if (!currentChatStore.currentRoom.id || !sessionStore.user?.id)
            return [];
        const reactions = await apiGetReactions(
            currentChatStore.currentRoom.id
        );

        currentChatStore.reactions = reactions.data;
    };

    return { getReactions };
};

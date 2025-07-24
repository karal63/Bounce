import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "@/shared/api/message/getMessages";
import type { MessageWithName } from "@/shared/types/Message";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();
    const sessionStore = useSessionStore();

    const getMessages = async (): Promise<MessageWithName[]> => {
        if (!currentChatStore.currentRoom.id || !sessionStore.user?.id)
            return [];
        const messages = await apiGetMessages(
            currentChatStore.currentRoom,
            sessionStore.user.id
        );
        return messages.data;
    };

    return { getMessages };
};

import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "@/shared/api/message/getMessages";
import type { MessageWithName } from "@/shared/types/Message";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessages = async (): Promise<MessageWithName[]> => {
        if (!currentChatStore.currentRoom.id) return [];
        const messages = await apiGetMessages(currentChatStore.currentRoom.id);
        return messages.data;
    };

    return { getMessages };
};

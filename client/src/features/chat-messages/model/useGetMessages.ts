import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "@/shared/api/message/getMessages";
import type { MessageWithName } from "@/entities/message/model/types";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessages = async (): Promise<MessageWithName[]> => {
        if (!currentChatStore.currentRoom) return [];
        const messages = await apiGetMessages(currentChatStore.currentRoom);
        return messages.data;
    };

    return { getMessages };
};

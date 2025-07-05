import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "@/shared/api/chat/getMessages";
import type { MessageWithName } from "@/features/COPYME/sendMessege/model/types/Message";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessages = async (): Promise<MessageWithName[]> => {
        if (!currentChatStore.currentRoom) return [];
        const messages = await apiGetMessages(currentChatStore.currentRoom);
        return messages.data;
    };

    return { getMessages };
};

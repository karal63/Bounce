import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "./apiGetMessages";
import type { Message } from "@/features/Chat/sendMessege/model/types/Message";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessages = async (): Promise<Message[]> => {
        const messages = await apiGetMessages(currentChatStore.currentRoom);
        return messages.data;
    };

    return { getMessages };
};

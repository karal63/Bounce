import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { apiGetMessages } from "./apiGetMessages";

export const useGetMessages = () => {
    const currentChatStore = useCurrentChatStore();

    const getMessages = async () => {
        const messages = await apiGetMessages(currentChatStore.currentRoom);
        return messages.data;
    };

    return { getMessages };
};

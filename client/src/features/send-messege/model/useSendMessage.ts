import { apiSendMessage } from "@/shared/api/message/sendMessage";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { ReadyMessage } from "@/shared/types/Message";

export const useSendMessage = () => {
    const currentChatStore = useCurrentChatStore();

    const send = async (message: ReadyMessage) => {
        try {
            const readyMessage: ReadyMessage = {
                ...message,
                groupId: currentChatStore.currentRoom,
            };
            if (!currentChatStore.currentRoom) return;
            await apiSendMessage(readyMessage, currentChatStore.currentRoom);
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};

import { apiSendMessage } from "@/features/Chat/sendMessege/model/apiSendMessage";
import type {
    ReadyMessage,
    Message,
} from "@/features/Chat/sendMessege/model/types/Message";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useSendMessage = () => {
    const currentChatStore = useCurrentChatStore();

    const send = async (message: Message) => {
        try {
            const readyMessage: ReadyMessage = {
                ...message,
                groupId: currentChatStore.currentRoom,
            };
            await apiSendMessage(readyMessage, currentChatStore.currentRoom);
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};

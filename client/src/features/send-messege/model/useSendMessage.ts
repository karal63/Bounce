import { apiSendDirectMessage } from "@/shared/api/message/sendDirectMessage";
import { apiSendGroupMessage } from "@/shared/api/message/sendGroupMessage";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { ReadyMessage } from "@/shared/types/Message";

export const useSendMessage = () => {
    const currentChatStore = useCurrentChatStore();

    const send = async (message: ReadyMessage) => {
        try {
            const room = currentChatStore.currentRoom;
            if (!room.id || !room.type) return;

            if (room.type === "group") {
                const readyMessage: ReadyMessage = {
                    ...message,
                    groupId: currentChatStore.currentRoom.id,
                };
                await apiSendGroupMessage(readyMessage, room.id);
            } else if (room.type === "direct") {
                const readyMessage: ReadyMessage = {
                    ...message,
                    recipientId: currentChatStore.currentRoom.id,
                };
                await apiSendDirectMessage(readyMessage, room.id);
            } else {
                console.warn("Unsupported room type:", room.type);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return { send };
};

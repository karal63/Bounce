import { apiDeleteMessage } from "@/shared/api/message/deleteMessage";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useDeleteMessage = () => {
    const currentChatStore = useCurrentChatStore();

    const deleteMessage = async (messageId: number) => {
        try {
            await apiDeleteMessage(messageId);
            currentChatStore.messages = currentChatStore.messages.filter(
                (msg) => msg.id !== messageId
            );
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteMessage };
};

import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { apiGetAttachments } from "@/shared/api";

export const useGetAttachments = () => {
    const currentChatStore = useCurrentChatStore();
    const sessionStore = useSessionStore();

    const getAttachments = async () => {
        if (!currentChatStore.currentRoom.id || !sessionStore.user?.id)
            return [];
        const attachments = await apiGetAttachments(
            currentChatStore.currentRoom.id
        );

        currentChatStore.attachments = attachments.data;
    };

    return { getAttachments };
};

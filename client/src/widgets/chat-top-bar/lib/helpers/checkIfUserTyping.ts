import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const checkIfUserTyping = () => {
    const currentChatStore = useCurrentChatStore();

    return currentChatStore.typingUsers.find(
        (user) =>
            user.typingUserId === currentChatStore.currentRoom.id ||
            user.recipientId === currentChatStore.currentRoom.id
    );
};

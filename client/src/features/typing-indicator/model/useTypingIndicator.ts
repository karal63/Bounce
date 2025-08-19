import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import type { TypingUser } from "@/shared/types/TypingUser";

export const useTypingIndicator = () => {
    const { socket } = useSocket();
    const currentChatStore = useCurrentChatStore();

    socket.on(
        "user-typing:update",
        ({ user, typing }: { user: TypingUser; typing: boolean }) => {
            if (typing) currentChatStore.typingUsers.push(user);
            else
                currentChatStore.typingUsers =
                    currentChatStore.typingUsers.filter(
                        (storeUser) =>
                            user.recipientId !== storeUser.recipientId &&
                            user.typingUserId !== storeUser.typingUserId
                    );
        }
    );
};

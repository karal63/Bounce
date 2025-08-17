import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";

export const usePresence = () => {
    const { socket } = useSocket();
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();

    if (!sessionStore.user?.id) return;
    // adds new online user
    socket.emit("login", sessionStore.user.id);

    // gets all online users
    socket.on("online:users", (users) => {
        currentChatStore.onlineUsers = new Set(users);
    });

    socket.on("status:update", ({ userId, online }) => {
        const newSet = new Set(currentChatStore.onlineUsers);

        if (online) newSet.add(userId);
        else newSet.delete(userId);

        currentChatStore.onlineUsers = newSet;
    });
};

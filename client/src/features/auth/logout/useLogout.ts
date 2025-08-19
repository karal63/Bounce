import { useRouter } from "vue-router";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { apiLogout } from "@/features/auth/logout/index";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useLogout = () => {
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();
    const router = useRouter();
    const { disconnectSocket, socket } = useSocket();

    const logout = async () => {
        // remove typing status for user that logged out
        socket.emit("user-not-typing", {
            typingUserId: sessionStore.user?.id,
            recipientId: currentChatStore.currentRoom.id,
        });

        await apiLogout();
        router.push("/login");
        disconnectSocket();

        // cleanup
        localStorage.removeItem("accessToken");

        sessionStore.user = null;
        sessionStore.isAuthenticated = false;

        currentChatStore.currentRoom = {
            id: null,
            type: null,
        };
        currentChatStore.messages = [];
        currentChatStore.messagedUsers = [];
        currentChatStore.groups = [];
        currentChatStore.onlineUsers = new Set();
        currentChatStore.reactions = [];
        currentChatStore.attachments = [];
        currentChatStore.stickers = [];
        currentChatStore.members = [];
        currentChatStore.hasPermissions = false;
        currentChatStore.allReactions = [];
    };

    return { logout };
};

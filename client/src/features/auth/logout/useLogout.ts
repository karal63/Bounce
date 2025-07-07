import { useRouter } from "vue-router";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { apiLogout } from "@/features/auth/logout/index";
import { useSocket } from "@/shared/config/useSocketStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";

export const useLogout = () => {
    const sessionStore = useSessionStore();
    const currentChatStore = useCurrentChatStore();
    const router = useRouter();
    const { disconnectSocket } = useSocket();

    const logout = async () => {
        await apiLogout();
        localStorage.removeItem("accessToken");
        sessionStore.user = null;
        sessionStore.isAuthenticated = false;
        disconnectSocket();
        currentChatStore.currentRoom = null;
        router.push("/login");
    };

    return { logout };
};

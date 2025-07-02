import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useRouter } from "vue-router";
import { apiLogout } from "./apiLogout";
import { useSocket } from "@/shared/config/useSocketStore";

export const useLogout = () => {
    const sessionStore = useSessionStore();
    const router = useRouter();
    const { disconnectSocket } = useSocket();

    const logout = async () => {
        await apiLogout();
        localStorage.removeItem("accessToken");
        sessionStore.user = null;
        sessionStore.isAuthenticated = false;
        disconnectSocket();
        router.push("/login");
    };

    return { logout };
};

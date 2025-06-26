import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useRouter } from "vue-router";

export const useLogout = () => {
    const sessionStore = useSessionStore();
    const router = useRouter();
    const logout = () => {
        localStorage.removeItem("accessToken");
        sessionStore.user = null;
        sessionStore.isAuthenticated = false;
        router.push("/login");
    };

    return { logout };
};

import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useRouter } from "vue-router";
import { apiLogout } from "./apiLogout";

export const useLogout = () => {
    const sessionStore = useSessionStore();
    const router = useRouter();

    const logout = async () => {
        await apiLogout();
        localStorage.removeItem("accessToken");
        sessionStore.user = null;
        sessionStore.isAuthenticated = false;
        router.push("/login");
    };

    return { logout };
};

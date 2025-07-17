import { AxiosError } from "axios";
import { useRouter } from "vue-router";
import { apiLogin } from "@/features/auth/login/index";
import type { AuthUser } from "@/features/auth/model/index";
import { useAuthStore } from "@/features/auth/model/index";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { useSocket } from "@/shared/config/useSocketStore";

export const useLogin = () => {
    const authStore = useAuthStore();
    const sessionStore = useSessionStore();
    const { connectSocket } = useSocket();

    const router = useRouter();

    const login = async (user: AuthUser) => {
        try {
            const res = await apiLogin({
                email: user.email,
                password: user.password,
            });

            localStorage.setItem("accessToken", res.data.accessToken);
            sessionStore.user = res.data.user;
            connectSocket();

            authStore.isLoading = false;
            authStore.error = "";
            sessionStore.isAuthenticated = true;
            router.push("/chat");
        } catch (e) {
            authStore.isLoading = false;
            if (e instanceof AxiosError && e.response && e.message) {
                authStore.error = e.response.data.message;
            } else {
                authStore.error = "An unexpected error occurred.";
            }
        }
    };

    return { login };
};

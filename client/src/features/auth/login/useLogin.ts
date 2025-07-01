import { apiLogin } from "@/features/auth/login/apiLogin";
import type { AuthUser } from "@/features/auth/model/types/authUser";
import { useAuthStore } from "@/features/auth/model/authStore";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";
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
            router.push("/chat/2ap");
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

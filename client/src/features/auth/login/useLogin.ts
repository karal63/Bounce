import { apiLogin } from "@/features/auth/login/apiLogin";
import type { User } from "@/shared/types/user";
import { useAuthStore } from "../model/authStore";
import { AxiosError } from "axios";

export const useLogin = () => {
    const authStore = useAuthStore();

    const login = async (user: User) => {
        try {
            const res = await apiLogin({
                email: user.email,
                password: user.password,
            });
            authStore.isLoading = false;
            authStore.error = "";
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

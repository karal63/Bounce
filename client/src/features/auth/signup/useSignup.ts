import { apiSignup } from "@/features/auth/signup/apiSignup";
import type { User } from "@/shared/types/user";
import { useAuthStore } from "@/features/auth/model/authStore";
import { AxiosError } from "axios";

export const useSignup = () => {
    const authStore = useAuthStore();

    const signup = async ({ email, password, passwordRepeat, name }: User) => {
        if (password !== passwordRepeat) {
            return (authStore.error = "Passwords are not the same.");
        }
        try {
            const res = await apiSignup({
                email,
                password,
                name,
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

    return { signup };
};

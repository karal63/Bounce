import { apiSignup } from "@/features/auth/signup/apiSignup";
import type { AuthUser } from "@/features/auth/model/types/authUser";
import { useAuthStore } from "@/features/auth/model/authStore";
import { AxiosError } from "axios";
import { useRouter } from "vue-router";

export const useSignup = () => {
    const authStore = useAuthStore();
    const router = useRouter();

    const signup = async ({
        email,
        password,
        passwordRepeat,
        name,
    }: AuthUser) => {
        if (password !== passwordRepeat) {
            return (authStore.error = "Passwords are not the same.");
        }
        try {
            await apiSignup({
                email,
                password,
                name,
            });
            authStore.isLoading = false;
            authStore.error = "";
            router.push("/login");
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

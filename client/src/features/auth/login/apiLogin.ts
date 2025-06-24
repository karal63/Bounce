import type { LoginProps } from "@/shared/types/auth";
import axios, { AxiosError } from "axios";
import { useAuthStore } from "@/features/auth/model/authStore";

axios.defaults.withCredentials = true;

export const apiLogin = async ({ email, password }: LoginProps) => {
    const authStore = useAuthStore();
    try {
        const res = await axios.post("http://localhost:5000/api/login", {
            email,
            password,
        });
        authStore.isLoading = false;
        authStore.error = "";
        return res;
    } catch (e) {
        authStore.isLoading = false;
        if (e instanceof AxiosError && e.response && e.message) {
            authStore.error = e.response.data.message;
        } else {
            authStore.error = "An unexpected error occurred.";
        }
        return e;
    }
};

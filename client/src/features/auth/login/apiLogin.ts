import type { LoginProps } from "@/shared/types/auth";
import axios from "axios";
import { useAuthStore } from "@/features/auth/model/authStore";

export const apiLogin = async ({ email, password }: LoginProps) => {
    const authStore = useAuthStore();
    try {
        const res = await axios.post("http://localhost:5000/api/login", {
            email,
            password,
        });
        authStore.isLoading = false;
        return res;
    } catch (error) {
        authStore.isLoading = false;
        return error;
    }
};

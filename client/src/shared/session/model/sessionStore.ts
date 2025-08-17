import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { User } from "@/shared/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("sessionStore", () => {
    const user = ref<User | null>();
    const isAuthenticated = ref(false);

    const checkAuth = async () => {
        const response = await axiosInstance.get(`${API_URL}/refresh`);
        if (response.status === 401)
            return console.error("Authentication error");

        localStorage.setItem("accessToken", response.data.accessToken);
        user.value = response.data.user;

        if (!user.value) return;

        isAuthenticated.value = true;
    };

    return { user, isAuthenticated, checkAuth };
});

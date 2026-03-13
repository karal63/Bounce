import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { User } from "@/shared/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("sessionStore", () => {
    const user = ref<User | null>();
    const isAuthenticated = ref(false);

    const checkAuth = async () => {
        try {
            const response = await axiosInstance.get(`${API_URL}/refresh`);

            localStorage.setItem("accessToken", response.data.accessToken);
            user.value = response.data.user;

            if (!user.value) return;

            isAuthenticated.value = true;
        } catch (error) {
            console.log(error);
        }
    };

    return { user, isAuthenticated, checkAuth };
});

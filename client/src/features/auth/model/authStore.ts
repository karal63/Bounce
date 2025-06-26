import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/features/auth/model/types/user";
import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref<User | null>();

    const isLoading = ref(false);
    const error = ref("");
    const isAuthenticated = ref(false);

    const checkAuth = async () => {
        const response = await axiosInstance.get(`${API_URL}/refresh`);
        localStorage.setItem("accessToken", response.data.accessToken);
        user.value = response.data.user;
        isAuthenticated.value = true;
    };

    return { isLoading, error, user, checkAuth, isAuthenticated };
});

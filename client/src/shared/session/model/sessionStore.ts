import { API_URL, axiosInstance } from "@/shared/config/axiosInstance";
import type { User } from "@/shared/types/User";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSessionStore = defineStore("sessionStore", () => {
    const user = ref<User | null>();
    const isAuthenticated = ref(false);

    const checkAuth = async () => {
        console.log("getting user");
        const response = await axiosInstance.get(`${API_URL}/refresh`);
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log(response.data.user);
        user.value = response.data.user;
        isAuthenticated.value = true;
    };

    return { user, isAuthenticated, checkAuth };
});

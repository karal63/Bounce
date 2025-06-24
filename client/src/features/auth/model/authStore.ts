import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/features/auth/model/types/user";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref<User | null>();

    const isLoading = ref(false);
    const error = ref("");

    return { isLoading, error, user };
});

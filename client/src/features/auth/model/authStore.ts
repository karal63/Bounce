import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const isLoading = ref(false);
    const error = ref("");

    return { isLoading, error };
});

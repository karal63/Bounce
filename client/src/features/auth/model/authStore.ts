import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore("authStore", () => {
    const isLoading = ref(false);

    return { isLoading };
});

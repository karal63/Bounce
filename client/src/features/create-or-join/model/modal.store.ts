import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const isModalOpen = ref(false);
    const error = ref("");
    const mode = ref("");
    return { isModalOpen, mode, error };
});

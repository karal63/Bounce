import { defineStore } from "pinia";
import { ref } from "vue";

export const useModalStore = defineStore("modalStore", () => {
    const isModalOpen = ref(false);

    return { isModalOpen };
});

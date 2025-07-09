import { defineStore } from "pinia";
import { ref } from "vue";

export const useShareModalStore = defineStore("shareModalStore", () => {
    const isShareModalOpen = ref(false);
    return { isShareModalOpen };
});

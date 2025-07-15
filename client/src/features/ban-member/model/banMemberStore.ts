import { defineStore } from "pinia";
import { ref } from "vue";

export const useBanMemberStore = defineStore("banMemberStore", () => {
    const isConfirmModalOpen = ref(false);

    return { isConfirmModalOpen };
});

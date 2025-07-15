import { defineStore } from "pinia";
import { ref } from "vue";

export const useKickMemberStore = defineStore("kickMemberStore", () => {
    const isConfirmModalOpen = ref(false);

    return { isConfirmModalOpen };
});

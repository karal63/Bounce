import { defineStore } from "pinia";
import { ref } from "vue";

export const useBanReasonStore = defineStore("banReasonStore", () => {
    const banReason = ref({
        isVisible: false,
        groupName: "",
        reason: "",
    });

    return { banReason };
});

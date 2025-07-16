import { defineStore } from "pinia";
import { ref } from "vue";

export const useBanReasonStore = defineStore("banReasonStore", () => {
    const banReason = ref({
        isVisible: true,
        groupName: "",
        reason: " 1231 qaq qwdqd qwqw 21 d1w dqdq dqwdw",
    });

    return { banReason };
});

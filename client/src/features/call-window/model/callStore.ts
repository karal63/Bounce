import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallStore = defineStore("call", () => {
    const isCalling = ref(false);

    const callUser = () => {
        isCalling.value = true;
    };

    const dropCall = () => {
        isCalling.value = false;
    };

    return { isCalling, callUser, dropCall };
});

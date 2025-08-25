import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallStore = defineStore("call", () => {
    const call = ref({
        isCalling: false,
        isMuted: false,
    });

    const callUser = () => {
        call.value = {
            isCalling: true,
            isMuted: false,
        };
    };

    const dropCall = () => {
        call.value = {
            isCalling: false,
            isMuted: false,
        };
    };

    const toggleMute = () => {
        call.value.isMuted = !call.value.isMuted;
    };

    return { call, callUser, dropCall, toggleMute };
});

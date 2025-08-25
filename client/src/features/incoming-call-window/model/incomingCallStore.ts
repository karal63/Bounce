import { useCallStore } from "@/features/call-window/@";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInclomingCallStore = defineStore("incomingCall", () => {
    const callStore = useCallStore();

    const incomingCall = ref({
        isCalling: true,
    });

    const decline = () => {
        incomingCall.value.isCalling = false;
    };

    const accept = () => {
        callStore.call.isCalling = true;
        incomingCall.value.isCalling = false;
    };

    return { incomingCall, decline, accept };
});

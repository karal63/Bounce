import type { IncomingCall } from "@/entities/call/model/types";
import { useCallStore } from "@/features/call-window/@";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInclomingCallStore = defineStore("incomingCall", () => {
    const callStore = useCallStore();

    const incomingCall = ref<IncomingCall>({
        isCalling: false,
        callingUserId: null,
    });

    const decline = () => {
        incomingCall.value.isCalling = false;
    };

    const accept = () => {
        callStore.call = {
            ...callStore.call,
            isCalling: true,
            to: incomingCall.value.callingUserId,
        };
        incomingCall.value.isCalling = false;
    };

    return { incomingCall, decline, accept };
});

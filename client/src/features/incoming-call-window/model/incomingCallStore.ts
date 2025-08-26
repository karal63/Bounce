import type { IncomingCall } from "@/entities/call/model/types";
import { useCallStore } from "@/features/call-window/@";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useInclomingCallStore = defineStore("incomingCall", () => {
    const callStore = useCallStore();
    const { socket } = useSocket();
    const sessionStore = useSessionStore();

    const incomingCall = ref<IncomingCall>({
        isCalling: false,
        callingUserId: null,
    });

    const callCanceled = (from?: string) => {
        if (from && incomingCall.value.callingUserId !== from) return;
        incomingCall.value = {
            isCalling: false,
            callingUserId: null,
        };
    };

    const decline = () => {
        socket.emit("call:end", {
            from: sessionStore.user?.id,
            to: incomingCall.value.callingUserId,
        });
        callCanceled();
    };

    const accept = () => {
        callStore.call = {
            ...callStore.call,
            isCalling: true,
            to: incomingCall.value.callingUserId,
        };
        socket.emit("call:accept", {
            from: sessionStore.user?.id,
            to: incomingCall.value.callingUserId,
        });
        callStore.setStatus("00:00");
        incomingCall.value.isCalling = false;
    };

    return { incomingCall, callCanceled, decline, accept };
});

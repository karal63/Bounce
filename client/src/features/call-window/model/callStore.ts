import type { Call } from "@/entities/call";
import { useInclomingCallStore } from "@/features/incoming-call-window/@";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallStore = defineStore("call", () => {
    const { socket } = useSocket();
    const sessionStore = useSessionStore();
    const incomingCallStore = useInclomingCallStore();

    const pendingCandidates = ref<RTCIceCandidateInit[]>([]);

    const callStatus = ref({
        isCalling: false,
        status: "Connecting...",
    });

    const call = ref<Call>({
        from: sessionStore.user?.id,
        to: null,
        isCalling: false,
        micEnabled: true,
        cameraEnabled: true,
        type: "voice",
        durationSec: 0,
    });

    // === call user
    const handleCall = (userId: string | null, type: "voice" | "video") => {
        call.value = {
            ...call.value,
            to: userId,
            isCalling: true,
            micEnabled: true,
            cameraEnabled: type === "video",
            type,
        };
        socket.emit("set:incoming-call", call.value);
    };

    // === caller hangs out
    const dropCall = () => {
        socket.emit("call:end", { from: call.value.from, to: call.value.to });
        incomingCallStore.callCanceled();
        call.value = {
            ...call.value,
            to: null,
            isCalling: false,
            micEnabled: true,
            cameraEnabled: true,
            durationSec: 0,
        };

        setStatus(false, "Connecting...");
    };

    // socket to close call
    const callEnd = () => {
        incomingCallStore.callCanceled();

        setStatus(false, "Canceled");
        setTimeout(() => {
            call.value = {
                ...call.value,
                isCalling: false,
                to: null,
                micEnabled: true,
                cameraEnabled: true,
                durationSec: 0,
            };
            setStatus(false, "Connecting...");
        }, 1000);
    };

    const setStatus = (isCalling: boolean, value: string) => {
        callStatus.value = {
            isCalling,
            status: value,
        };
    };

    // socket to close call
    const busyCall = () => {
        setStatus(false, "Busy");
        setTimeout(() => {
            call.value = {
                ...call.value,
                isCalling: false,
                to: null,
                micEnabled: true,
                cameraEnabled: true,
            };
            setStatus(false, "Connecting...");
        }, 2000);
    };

    return {
        call,
        handleCall,
        dropCall,
        callStatus,
        setStatus,
        callEnd,
        pendingCandidates,
        busyCall,
    };
});

import type { Call } from "@/entities/call";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallStore = defineStore("call", () => {
    const { socket } = useSocket();
    const sessionStore = useSessionStore();

    let localStream = ref<MediaStream | null>(null);
    let remoteStream = ref<MediaStream | null>(null);

    const pendingCandidates = ref<RTCIceCandidateInit[]>([]);

    const callStatus = ref("Connecting...");

    const call = ref<Call>({
        from: sessionStore.user?.id,
        to: null,
        isCalling: false,
        isMuted: false,
    });

    // === call user
    const handleCall = (userId: string | null) => {
        call.value = {
            ...call.value,
            to: userId,
            isCalling: true,
            isMuted: false,
        };
        socket.emit("set:incoming-call", call.value);

        if (!call.value.to) return;
    };

    // === caller hangs out
    const dropCall = () => {
        socket.emit("call:end", { from: call.value.from, to: call.value.to });
        call.value = {
            ...call.value,
            to: null,
            isCalling: false,
            isMuted: false,
        };
    };

    // socket to close call
    const callEnd = (from: string) => {
        if (from !== call.value.to) return;
        setStatus("Canceled");
        setTimeout(() => {
            call.value = {
                ...call.value,
                isCalling: false,
                to: null,
                isMuted: false,
            };
            setStatus("Connecting...");
        }, 1000);
    };

    const toggleMute = () => {
        call.value.isMuted = !call.value.isMuted;
    };

    const setStatus = (value: string) => {
        callStatus.value = value;
    };

    return {
        call,
        handleCall,
        dropCall,
        toggleMute,
        callStatus,
        setStatus,
        callEnd,
        localStream,
        remoteStream,
        pendingCandidates,
    };
});

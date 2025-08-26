import type { Call } from "@/entities/call";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCallStore = defineStore("call", () => {
    const { socket } = useSocket();
    const sessionStore = useSessionStore();

    const call = ref<Call>({
        from: sessionStore.user?.id,
        to: null,
        isCalling: false,
        isMuted: false,
    });

    const callUser = (userId: string | null) => {
        call.value = {
            ...call.value,
            to: userId,
            isCalling: true,
            isMuted: false,
        };
        socket.emit("set:incoming-call", call.value);
    };

    const dropCall = () => {
        socket.emit("call:end", { from: call.value.from, to: call.value.to });
        call.value = {
            ...call.value,
            to: null,
            isCalling: false,
            isMuted: false,
        };
    };

    const toggleMute = () => {
        call.value.isMuted = !call.value.isMuted;
    };

    return { call, callUser, dropCall, toggleMute };
});

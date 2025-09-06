import type { IncomingCall } from "@/entities/call/model/types";
import { useCallStore } from "@/features/call-window/@";
import { useSocket } from "@/shared/config/useSocketStore";
import { useSessionStore } from "@/shared/session/model/sessionStore";
import { defineStore } from "pinia";
import { ref } from "vue";

import IncomingCallSound from "@/shared/assets/incomingCallSound.mp3";

export const useInclomingCallStore = defineStore("incomingCall", () => {
    const callStore = useCallStore();
    const { socket } = useSocket();
    const sessionStore = useSessionStore();

    const incomingCall = ref<IncomingCall>({
        isCalling: false,
        callingUserId: null,
        type: "voice",
    });
    const offer = ref();
    const incomingCallSound = ref<HTMLAudioElement>(
        new Audio(IncomingCallSound)
    );

    const callCanceled = (from?: string) => {
        if (from && incomingCall.value.callingUserId !== from) return;
        incomingCallSound.value.pause();

        incomingCall.value = {
            isCalling: false,
            callingUserId: null,
            type: "voice",
        };

        offer.value = null;
    };

    const decline = () => {
        incomingCallSound.value.pause();

        socket.emit("call:end", {
            from: sessionStore.user?.id,
            to: incomingCall.value.callingUserId,
        });
        callCanceled();
    };

    const accept = () => {
        if (!incomingCall.value.callingUserId) return;
        incomingCallSound.value.pause();

        callStore.call = {
            ...callStore.call,
            isCalling: true,
            to: incomingCall.value.callingUserId,
            type: incomingCall.value.type,
        };
        socket.emit("call:accept", {
            from: sessionStore.user?.id,
            to: incomingCall.value.callingUserId,
        });

        callStore.callStatus.isCalling = true;
        callStore.callStatus.status = "00:00";

        incomingCall.value.isCalling = false;
    };

    const setOffer = (newOffer: RTCSessionDescriptionInit) => {
        offer.value = newOffer;
    };

    return {
        incomingCall,
        callCanceled,
        decline,
        accept,
        offer,
        setOffer,
        incomingCallSound,
    };
});

<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { Icon } from "@iconify/vue";
import { useInclomingCallStore } from "../../model/incomingCallStore";
import { onMounted, onUnmounted } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { useCallStore } from "@/features/call-window/@";

const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();
const callStore = useCallStore();

const getIncomingCall = ({
    from,
    type,
}: {
    from: string;
    type: "voice" | "video";
}) => {
    if (callStore.call.isCalling) return;
    incomingCallStore.incomingCall = {
        ...incomingCallStore.incomingCall,
        isCalling: true,
        callingUserId: from,
        type,
    };
};

onMounted(() => {
    socket.on("get:incoming-call", getIncomingCall);
    socket.on("call:end", ({ from }) => incomingCallStore.callCanceled(from));

    socket.on("webrtc:offer", ({ offer }) => {
        incomingCallStore.offer = offer;
    });
});

// wrong function setOffer, should work on accept

onUnmounted(() => {
    socket.off("get:incoming-call", getIncomingCall);
    socket.off("call:end", ({ from }) => incomingCallStore.callCanceled(from));

    socket.off("webrtc:offer", ({ offer }) => {
        incomingCallStore.setOffer(offer);
    });
});
</script>

<template>
    <DefaultModal
        v-show="incomingCallStore.incomingCall.isCalling"
        v-if="incomingCallStore.incomingCall.callingUserId"
        :event="
            findMessagedUserById(incomingCallStore.incomingCall.callingUserId)
                ?.otherUserName + ' calling'
        "
        size-x="400"
        size-y="150"
        :store-state="incomingCallStore.incomingCall.isCalling"
    >
        <div class="flex items-center justify-center gap-4">
            <button
                @click="incomingCallStore.accept"
                class="bg-green-500 w-13 h-13 rounded-full text-3xl flex-center cursor-pointer transition-all"
            >
                <Icon icon="proicons:call" />
            </button>

            <button
                @click="incomingCallStore.decline"
                class="bg-red-500 w-13 h-13 rounded-full text-4xl flex-center cursor-pointer"
            >
                <Icon icon="fluent:call-end-16-regular" />
            </button>

            <button
                class="absolute right-4 top-4 rounded-full text-3xl flex-center cursor-pointer"
            >
                <Icon icon="ic:round-close" />
            </button>
        </div>
    </DefaultModal>
</template>

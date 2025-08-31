<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { Icon } from "@iconify/vue";
import { useInclomingCallStore } from "../../model/incomingCallStore";
import { onMounted, onUnmounted } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { useCall } from "@/features/call-window/@";

const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();

const { handleOffer } = useCall();

const getIncomingCall = (fromId: string) => {
    incomingCallStore.incomingCall = {
        ...incomingCallStore.incomingCall,
        isCalling: true,
        callingUserId: fromId,
    };
};

const callCanceled = ({ from }: { from: string }) => {
    incomingCallStore.callCanceled(from);
};

onMounted(() => {
    socket.on("get:incoming-call", getIncomingCall);
    socket.on("call:end", callCanceled);

    socket.on("offer", ({ offer }) => handleOffer(offer));
});

onUnmounted(() => {
    socket.off("get:incoming-call", getIncomingCall);
    socket.off("call:end", callCanceled);
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

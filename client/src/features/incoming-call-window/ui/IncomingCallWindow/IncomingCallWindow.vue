<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useInclomingCallStore } from "../../model/incomingCallStore";
import { onMounted, onUnmounted } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { useCallStore } from "@/features/call-window/@";
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { ref } from "vue";

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
    if (callStore.call.isCalling) {
        socket.emit("call:busy", { to: from });
        return;
    }
    incomingCallStore.incomingCallSound.currentTime = 0;
    incomingCallStore.incomingCallSound.loop = true;
    incomingCallStore.incomingCallSound.volume = 0.5;
    incomingCallStore.incomingCallSound.play();

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
    <ModalTransition>
        <div
            v-show="incomingCallStore.incomingCall.isCalling"
            v-if="incomingCallStore.incomingCall.callingUserId"
            class="absolute w-full h-full left-0 top-0 flex-center bg-black/40"
        >
            <div
                class="relative w-[300px] h-[325px] bg-mainGray p-2 flex-col justify-between"
            >
                <div class="mt-5 flex-col w-full items-center">
                    <UserAvatar
                        alt="user"
                        size="100"
                        :src="
                            findMessagedUserById(
                                incomingCallStore.incomingCall.callingUserId
                            )?.avatarUrl
                        "
                    />
                    <h3 class="text-lg mt-2">
                        {{
                            findMessagedUserById(
                                incomingCallStore.incomingCall.callingUserId
                            )?.otherUserName ?? "Unknown user"
                        }}
                    </h3>
                    <p class="mt-1 text-secondary">
                        Incoming
                        {{ incomingCallStore.incomingCall.type }} call...
                    </p>
                </div>
                <div class="flex-col gap-2">
                    <button
                        @click="incomingCallStore.accept"
                        class="bg-green-500 hover:bg-green-600 w-full h-10 rounded-md flex-center cursor-pointer gap-2 transition-all"
                    >
                        <Icon icon="proicons:call" class="text-3xl" />
                        <span class="text-lg">Join</span>
                    </button>

                    <button
                        @click="incomingCallStore.decline"
                        class="bg-gray-600 hover:bg-gray-700 w-full h-10 rounded-md flex-center cursor-pointer gap-2 text-lg transition-all"
                    >
                        Decline
                    </button>
                </div>

                <button
                    @click="incomingCallStore.decline"
                    class="absolute right-4 top-4 rounded-full text-3xl flex-center cursor-pointer"
                >
                    <Icon icon="ic:round-close" />
                </button>
            </div>
        </div>
    </ModalTransition>
</template>

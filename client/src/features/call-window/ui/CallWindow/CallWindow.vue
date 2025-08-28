<script setup lang="ts">
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { Icon } from "@iconify/vue";
import { useCallStore } from "../../model/callStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { useSocket } from "@/shared/config/useSocketStore";
import { onMounted, onUnmounted, ref } from "vue";
import { watch } from "vue";
import {
    handleAnswer,
    handleCandidate,
    handleOffer,
    startLocalStream,
} from "../../lib/rtc";

const callStore = useCallStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();

const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);

const endCall = ({ from }: { from: string }) => {
    if (from !== callStore.call.to) return;
    callStore.setStatus("Canceled");
    setTimeout(() => {
        callStore.call = {
            ...callStore.call,
            isCalling: false,
            to: null,
            isMuted: false,
        };
        callStore.setStatus("Connecting...");
    }, 1000);
};

const acceptCall = ({ from }: { from: string }) => {
    if (callStore.call.to !== from) return;
    callStore.setStatus("00:00");

    // create timer here
};

onMounted(() => {
    socket.on("call:end", endCall);
    socket.on("call:accept", acceptCall);

    socket.on("webrtc:offer", ({ offer }) => handleOffer(offer));
    socket.on("webrtc:answer", ({ answer }) => handleAnswer(answer));
    socket.on("webrtc:candidate", ({ candidate }) =>
        handleCandidate(candidate)
    );
});

onUnmounted(() => {
    socket.off("call:end", endCall);
    socket.off("call:accept", acceptCall);
});

// Start local media when call begins
watch(
    () => callStore.call.isCalling,
    (isCalling) => {
        if (isCalling) startLocalStream(localVideo);
    }
);

// Make sure elements pick up streams and actually play
onMounted(async () => {
    if (localVideo.value && callStore.localStream) {
        localVideo.value.srcObject = callStore.localStream;
        localVideo.value.muted = true;
        localVideo.value.playsInline = true;
        try {
            await localVideo.value.play();
        } catch {}
    }
    if (remoteVideo.value && callStore.remoteStream) {
        remoteVideo.value.srcObject = callStore.remoteStream;
        remoteVideo.value.playsInline = true;
        try {
            await remoteVideo.value.play();
        } catch {}
    }
});

// React when remote stream reference changes
watch(
    () => callStore.remoteStream,
    async (stream) => {
        if (remoteVideo.value && stream) {
            remoteVideo.value.srcObject = stream;
            remoteVideo.value.playsInline = true;
            try {
                await remoteVideo.value.play();
            } catch {}
        }
    },
    { immediate: true } // no need for deep
);
</script>

<template>
    <ModalTransition
        v-if="currentChatStore.currentRoom.type !== 'group'"
        v-show="callStore.call.isCalling"
    >
        <div
            class="absolute left-0 top-0 h-full w-full bg-mainGray/90 backdrop-blur-md"
        >
            <!-- if video show it -->
            <!-- <div>
                <video
                    ref="localVideo"
                    autoplay
                    playsinline
                    muted
                    class="w-60 h-40 bg-black"
                ></video>
                123
            </div> -->
            <video
                ref="remoteVideo"
                autoplay
                playsinline
                class="w-full h-full bg-black"
            ></video>

            <!-- else -->
            <div class="h-full flex-center">
                <div class="flex-col items-center">
                    <UserAvatar
                        v-if="callStore.call.to"
                        size="125"
                        alt="user"
                        :src="
                            findMessagedUserById(callStore.call.to)?.avatarUrl
                        "
                        class="border-4 border-purple-500 drop-shadow-2xl drop-shadow-purple-900"
                    />

                    <p v-if="callStore.call.to" class="text-xl mt-8">
                        {{
                            findMessagedUserById(callStore.call.to)
                                ?.otherUserName ?? "error: could not get name"
                        }}
                    </p>

                    <p class="mt-3 text-green-400">
                        {{ callStore.callStatus }}
                    </p>
                </div>
            </div>

            <!-- buttons panel -->
            <div
                class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-mainDarkBg/20 px-4 py-2 rounded-full flex items-center gap-4"
            >
                <button
                    @click="callStore.toggleMute"
                    class="w-13 h-13 rounded-full text-3xl flex-center cursor-pointer transition-all"
                    :class="
                        callStore.call.isMuted
                            ? 'bg-purple-500'
                            : 'hover:bg-mainHoverOnGray'
                    "
                >
                    <Icon icon="quill:mute" />
                </button>

                <button
                    @click="callStore.dropCall"
                    class="bg-red-500 w-13 h-13 rounded-full text-4xl flex-center cursor-pointer"
                >
                    <Icon icon="fluent:call-end-16-regular" />
                </button>
            </div>

            <!-- close call button -->
            <button
                @click="callStore.dropCall"
                class="absolute right-4 top-4 rounded-full text-3xl flex-center cursor-pointer"
            >
                <Icon icon="ic:round-close" />
            </button>
        </div>
    </ModalTransition>
</template>

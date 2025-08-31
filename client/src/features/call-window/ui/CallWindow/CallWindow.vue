<script setup lang="ts">
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import { Icon } from "@iconify/vue";
import { useCallStore } from "../../model/callStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { onMounted, onUnmounted } from "vue";
import { watch } from "vue";
import { useCall } from "../../lib/useCall";

const callStore = useCallStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const {
    startLocalStream,
    localVideo,
    remoteVideo,
    handleAnswer,
    handleCandidate,
} = useCall();

const acceptCall = ({ from }: { from: string }) => {
    if (callStore.call.to !== from) return;
    callStore.setStatus("00:00");
};

watch(
    () => callStore.call.isCalling,
    () => {
        if (callStore.call.isCalling) {
            console.log("calling");
            startLocalStream();
        }
    }
);

onMounted(() => {
    socket.on("call:end", ({ from }) => callStore.callEnd(from));
    socket.on("call:accept", acceptCall);

    socket.on("answer", ({ answer }) => handleAnswer(answer));
    socket.on("candidate", ({ candidate }) => handleCandidate(candidate));
});

onUnmounted(() => {
    socket.off("call:end", ({ from }) => callStore.callEnd(from));
    socket.off("call:accept", acceptCall);
});
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
            <div
                class="absolute right-4 bottom-30 w-60 h-40 bg-white rounded-xl overflow-hidden flex-center"
            >
                <video
                    ref="localVideo"
                    autoplay
                    playsinline
                    muted
                    class="w-60 h-45"
                ></video>
            </div>
            <video
                ref="remoteVideo"
                autoplay
                playsinline
                class="w-full h-full bg-black"
            ></video>

            <!-- else -->
            <!-- <div class="h-full flex-center">
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
            </div> -->

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

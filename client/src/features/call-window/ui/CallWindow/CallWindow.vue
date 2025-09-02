<script setup lang="ts">
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import { Icon } from "@iconify/vue";
import { useCallStore } from "../../model/callStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { onMounted, onUnmounted } from "vue";
import { watch } from "vue";
import { useInclomingCallStore } from "@/features/incoming-call-window/@";
import { ref } from "vue";
import { IncomingCallWindow } from "@/features/incoming-call-window";
import { findMessagedUserById } from "@/shared/lib/helpers";
import UserAvatar from "@/shared/ui/UserAvatar.vue";

const servers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const callStore = useCallStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();

const pc = ref<RTCPeerConnection | null>(null);
const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);
const localStream = ref<MediaStream | null>(null);
const pendingCandidates = ref<RTCIceCandidateInit[]>([]);

const acceptCall = ({ from }: { from: string }) => {
    if (callStore.call.to !== from) return;
    callStore.setStatus("00:00");
};

const startLocalStream = async () => {
    localStream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    if (!localVideo.value) return;
    localVideo.value.srcObject = localStream.value;
};

const createOffer = async () => {
    pc.value = new RTCPeerConnection(servers);

    pc.value.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("candidate", { candidate: event.candidate });
        }
    };

    pc.value.ontrack = (event) => {
        if (remoteVideo.value) {
            remoteVideo.value.srcObject = event.streams[0];
        }
    };

    if (localStream.value) {
        localStream.value
            .getTracks()
            .forEach((t) => pc.value?.addTrack(t, localStream.value!));
    }

    const offer = await pc.value.createOffer();
    await pc.value.setLocalDescription(offer);

    socket.emit("offer", { offer });
    return pc.value;
};

const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await pc.value?.setRemoteDescription(new RTCSessionDescription(answer));

    for (const c of pendingCandidates.value) {
        await pc.value?.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.value.length = 0;
};

const handleCandidate = async (candidate: RTCIceCandidateInit) => {
    if (pc.value?.remoteDescription) {
        await pc.value.addIceCandidate(new RTCIceCandidate(candidate));
    } else {
        pendingCandidates.value.push(candidate);
    }
};

watch(
    () => callStore.call.isCalling,
    async () => {
        if (
            callStore.call.isCalling &&
            !incomingCallStore.incomingCall.callingUserId
        ) {
            console.log("you are caller");
            await startLocalStream();
            await createOffer();
        }
    }
);

onMounted(() => {
    socket.on("call:end", ({ from }) => callStore.callEnd(from));
    socket.on("call:accept", acceptCall);

    socket.on("answer", ({ answer }) => {
        handleAnswer(answer);
    });
    socket.on("candidate", ({ candidate }) => {
        handleCandidate(candidate);
    });
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
    <IncomingCallWindow :local-video="localVideo" :remote-video="remoteVideo" />
</template>

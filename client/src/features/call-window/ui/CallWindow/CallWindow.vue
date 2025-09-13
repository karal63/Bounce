<script setup lang="ts">
import ModalTransition from "@/shared/ui/ModalTransition.vue";
import { Icon } from "@iconify/vue";
import { useCallStore } from "../../model/callStore";
import { useCurrentChatStore } from "@/shared/model/currentChatStore";
import { useSocket } from "@/shared/config/useSocketStore";
import { computed, onMounted, onUnmounted, watch, type Ref } from "vue";
import { useInclomingCallStore } from "@/features/incoming-call-window/@";
import { ref } from "vue";
import { IncomingCallWindow } from "@/features/incoming-call-window";
import { findMessagedUserById } from "@/shared/lib/helpers";
import UserAvatar from "@/shared/ui/UserAvatar.vue";
import { useCall } from "../../lib/useCall";
import WaitingSound from "@/shared/assets/ring-tone.mp3";
import AcceptedCallSound from "@/shared/assets/acceptedCallSound.mp3";

const callStore = useCallStore();
const currentChatStore = useCurrentChatStore();
const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();
const { endCall, startLocalStream, createPeerConnection } = useCall();

const pc = ref<RTCPeerConnection | null>(null);
const localVideo = ref<HTMLVideoElement | null>(null);
const remoteVideo = ref<HTMLVideoElement | null>(null);
const localStream = ref<MediaStream | null>(null);
const pendingCandidates = ref<RTCIceCandidateInit[]>([]);
const remoteVoice = ref<HTMLAudioElement | null>(null);
const waitingRingTone = ref<HTMLAudioElement>(new Audio(WaitingSound));
const acceptedCallSound = ref<HTMLAudioElement>(new Audio(AcceptedCallSound));
const callTime = ref();
const videoStream = ref<MediaStream | null>(null);

const pauseSound = (state: Ref<HTMLAudioElement>) => {
    state.value.pause();
};

const playSound = (state: Ref<HTMLAudioElement>, loop: boolean) => {
    state.value.currentTime = 0;
    state.value.loop = loop;
    state.value.volume = 0.5;
    state.value.play();
};

const onAcceptCall = ({ from }: { from: string }) => {
    if (callStore.call.to !== from) return;
    startCallTime();
    callStore.setStatus(true, "00:00");
};

// === fires when other user hangs up
const onHangUp = ({ from }: { from: string }) => {
    if (from !== callStore.call.to) return;
    if (callTime.value) {
        clearInterval(callTime.value);
    }

    callStore.callEnd();
    pauseSound(waitingRingTone);

    // clean up media files
    endCall(pc, localStream, remoteVoice, remoteVideo, pendingCandidates);
};

// === hang up button
const drop = () => {
    clearInterval(callTime.value);
    // emits to other user that call was ended
    callStore.dropCall();
    pauseSound(waitingRingTone);

    // clean up media files
    endCall(pc, localStream, remoteVoice, remoteVideo, pendingCandidates);
};

const calleeIsBusy = () => {
    callStore.busyCall();
};

const startCallTime = () => {
    callTime.value = setInterval(() => {
        callStore.call.durationSec += 1;
    }, 1000);
};

const createOffer = async () => {
    await startLocalStream(localStream, localVideo);
    await createPeerConnection(pc, remoteVideo, localStream, remoteVoice);

    const offer = await pc.value?.createOffer();
    await pc.value?.setLocalDescription(offer);

    socket.emit("webrtc:offer", { offer, to: callStore.call.to });
    return pc.value;
};

const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    pauseSound(waitingRingTone);
    playSound(acceptedCallSound, false);

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

const handleOffer = async () => {
    console.log("new offer");
    await startLocalStream(localStream, localVideo);
    await createPeerConnection(pc, remoteVideo, localStream, remoteVoice);

    await pc.value?.setRemoteDescription(
        new RTCSessionDescription(incomingCallStore.offer)
    );

    const answer = await pc.value?.createAnswer();
    await pc.value?.setLocalDescription(answer);

    socket.emit("webrtc:answer", {
        answer,
        to: incomingCallStore.incomingCall.callingUserId,
    });

    for (const c of pendingCandidates.value) {
        await pc.value?.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.value.length = 0;
};

const handleRenegotiate = async ({
    offer,
}: {
    offer: RTCSessionDescriptionInit;
}) => {
    if (!pc.value) return;

    await pc.value.setRemoteDescription(offer);
    const answer = await pc.value.createAnswer();
    await pc.value.setLocalDescription(answer);
    socket.emit("webrtc:answer", {
        answer,
        to: callStore.call.to,
    });
    console.log("renegotiation");
};

watch(
    () => callStore.call.isCalling,
    async () => {
        if (
            callStore.call.isCalling &&
            !incomingCallStore.incomingCall.callingUserId
        ) {
            playSound(waitingRingTone, true);
            await createOffer();
        }
    }
);

onMounted(() => {
    socket.on("call:end", onHangUp);
    socket.on("call:accept", onAcceptCall);
    socket.on("call:busy", calleeIsBusy);

    socket.on("webrtc:answer", ({ answer }) => {
        handleAnswer(answer);
    });
    socket.on("webrtc:candidate", ({ candidate }) => {
        handleCandidate(candidate);
    });

    socket.on("webrtc:renegotiate", handleRenegotiate);
});

onUnmounted(() => {
    clearInterval(callTime.value);

    socket.off("call:end", onHangUp);
    socket.off("call:accept", onAcceptCall);
    socket.off("call:busy", calleeIsBusy);

    socket.off("webrtc:answer", ({ answer }) => {
        handleAnswer(answer);
    });
    socket.off("webrtc:candidate", ({ candidate }) => {
        handleCandidate(candidate);
    });
    socket.off("webrtc:renegotiate", handleRenegotiate);
});

watch(
    () => [callStore.call.isCalling, incomingCallStore.offer],
    () => {
        if (
            callStore.call.isCalling &&
            incomingCallStore.incomingCall.callingUserId
        ) {
            startCallTime();
            handleOffer();
        }
    },
    { deep: true }
);

const formattedCallDuration = computed(() => {
    if (!callStore.callStatus.isCalling) {
        return callStore.callStatus.status;
    }

    const totalSec = callStore.call.durationSec;
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
    )}:${String(seconds).padStart(2, "0")}`;
});

// now work on mute button
const toggleMic = async () => {
    if (!localStream.value) return;
    callStore.call.micEnabled = !callStore.call.micEnabled;
    localStream.value.getTracks()[0].enabled = callStore.call.micEnabled;
};

const toggleCamera = async () => {
    if (!localStream.value || !pc.value) return;

    const hasVideo = localStream.value.getVideoTracks().length > 0;
    console.log(hasVideo);

    if (!hasVideo) {
        // No video track yet → request it
        const videoStream = await navigator.mediaDevices.getUserMedia({
            video: true,
        });
        const videoTrack = videoStream.getVideoTracks()[0];
        console.log(videoTrack);

        if (videoTrack) {
            localStream.value.addTrack(videoTrack);

            // Update peer connection if already in call
            const sender = pc.value
                .getSenders()
                .find((s) => s.track?.kind === "video");
            if (sender) {
                sender.replaceTrack(videoTrack);
                console.log("sender exists");
            } else {
                pc.value.addTrack(videoTrack, localStream.value);
                console.log("sender doesnt exists");
                renegotiate();
            }
        }
        callStore.call.cameraEnabled = true;

        // // emit to callee with new offer
    } else {
        // Already has a video track → toggle enable/disable
        const videoTrack = localStream.value.getVideoTracks()[0];
        videoTrack.enabled = !videoTrack.enabled;
        callStore.call.cameraEnabled = videoTrack.enabled;

        // If fully disabling (not just mute), you may also want to stop/remove it:
        if (!videoTrack.enabled) {
            console.log(await localStream.value.getVideoTracks());
            videoTrack.stop();
            localStream.value.removeTrack(videoTrack);

            // === this breaks app
            // const sender = pc.value
            //     .getSenders()
            //     .find((s) => s.track?.kind === "video");
            // console.log(sender);
            // if (sender) {
            //     console.log("replacing");
            //     sender.replaceTrack(null);
            // }
        }
    }
};

// ====
// maybe i can still fix it, pay attention on detail:
// when i call user enable, disable and enable camera it freezes for callee
// but also localvideo turns into black, this might be the issue
// ====

const renegotiate = async () => {
    if (!pc.value) return;
    const offer = await pc.value.createOffer();
    await pc.value.setLocalDescription(offer);
    socket.emit("webrtc:renegotiate", { offer, to: callStore.call.to });
};
</script>

<!-- v-if="callStore.call.type === 'video'" -->
<template>
    <ModalTransition
        v-if="currentChatStore.currentRoom.type !== 'group'"
        v-show="callStore.call.isCalling"
    >
        <div
            class="absolute left-0 top-0 h-full w-full bg-mainGray/90 backdrop-blur-md"
        >
            <div class="h-full">
                <div
                    v-show="callStore.call.cameraEnabled"
                    class="absolute right-4 bottom-30 w-60 h-40 bg-white rounded-xl overflow-hidden flex-center"
                >
                    <video
                        ref="localVideo"
                        autoplay
                        muted
                        playsinline
                        class="w-60 h-45"
                    ></video>
                </div>

                <video
                    v-if="callStore.callStatus.isCalling"
                    ref="remoteVideo"
                    autoplay
                    playsinline
                    class="w-full h-full bg-black"
                ></video>
            </div>

            <!-- you hear your own voice -->
            <audio
                ref="remoteVoice"
                v-if="
                    callStore.call.type === 'voice' &&
                    callStore.callStatus.isCalling
                "
                autoplay
                playsinline
            ></audio>

            <!-- else -->
            <div
                v-if="
                    (callStore.callStatus.isCalling &&
                        callStore.call.type === 'voice') ||
                    !callStore.callStatus.isCalling
                "
                class="h-full flex-center"
            >
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
                        {{ formattedCallDuration }}
                    </p>
                </div>
            </div>

            <!-- buttons panel -->
            <div
                class="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-mainDarkBg/50 px-4 py-2 rounded-full flex items-center gap-4"
            >
                <button
                    @click="toggleMic"
                    class="w-13 h-13 rounded-full text-3xl flex-center cursor-pointer transition-all"
                    :class="
                        !callStore.call.micEnabled
                            ? 'bg-purple-500'
                            : 'hover:bg-mainHoverOnGray'
                    "
                >
                    <Icon
                        :icon="
                            callStore.call.micEnabled
                                ? 'fluent:speaker-2-32-regular'
                                : 'quill:mute'
                        "
                    />
                </button>

                <button
                    @click="toggleCamera"
                    class="w-13 h-13 rounded-full text-3xl flex-center cursor-pointer transition-all"
                    :class="
                        callStore.call.cameraEnabled
                            ? 'bg-purple-500'
                            : 'hover:bg-mainHoverOnGray'
                    "
                >
                    <Icon
                        :icon="
                            callStore.call.cameraEnabled
                                ? 'fluent:video-28-regular'
                                : 'fluent:video-off-48-regular'
                        "
                    />
                </button>

                <button
                    @click="drop"
                    class="bg-red-500 w-13 h-13 rounded-full text-4xl flex-center cursor-pointer"
                >
                    <Icon icon="fluent:call-end-16-regular" />
                </button>
            </div>

            <!-- close call button -->
            <button
                @click="drop"
                class="absolute right-4 top-4 rounded-full text-3xl flex-center cursor-pointer"
            >
                <Icon icon="ic:round-close" />
            </button>
        </div>
    </ModalTransition>
    <IncomingCallWindow :local-video="localVideo" :remote-video="remoteVideo" />
</template>

<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { Icon } from "@iconify/vue";
import { useInclomingCallStore } from "../../model/incomingCallStore";
import { onMounted, onUnmounted, watch } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { findMessagedUserById } from "@/shared/lib/helpers";

const servers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();

let pc: RTCPeerConnection | null = null;

const props = defineProps<{
    localVideo: HTMLVideoElement | null;
    remoteVideo: HTMLVideoElement | null;
}>();

let localStream: MediaStream | null = null;
let remoteStream: MediaStream | null = null;
const pendingCandidates: RTCIceCandidateInit[] = [];

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

const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    console.log(0);
    if (!props.localVideo) return;
    props.localVideo.srcObject = localStream;

    console.log(1);

    pc = new RTCPeerConnection(servers);

    pc.onicecandidate = (event) => {
        console.log("new candidate");
        if (event.candidate) {
            socket.emit("candidate", { candidate: event.candidate });
        }
    };

    pc.ontrack = (event) => {
        remoteStream = event.streams[0];
        attachRemoteStream();
    };

    console.log(2);

    if (localStream) {
        // check if exists, this might be the issue for no media in answer
        console.log(localStream);
        localStream.getTracks().forEach((t) => pc?.addTrack(t, localStream!));
    }

    await pc?.setRemoteDescription(new RTCSessionDescription(offer));

    console.log(3);

    const answer = await pc?.createAnswer();
    await pc?.setLocalDescription(answer);

    socket.emit("answer", { answer });

    console.log(4);

    for (const c of pendingCandidates) {
        await pc!.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.length = 0;

    console.log(5);

    incomingCallStore.accept();
};

const attachRemoteStream = () => {
    if (props.remoteVideo && remoteStream) {
        props.remoteVideo.srcObject = remoteStream;
    }
};

// onMounted(() => {
//     watch(remoteVideo, () => attachRemoteStream());
// });

onMounted(() => {
    socket.on("get:incoming-call", getIncomingCall);
    socket.on("call:end", callCanceled);

    socket.on("offer", ({ offer }) => {
        console.log("wow, offer just came out");
        handleOffer(offer);
    });
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

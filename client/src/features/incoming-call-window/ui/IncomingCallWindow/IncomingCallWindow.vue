<script setup lang="ts">
import DefaultModal from "@/shared/ui/DefaultModal.vue";
import { Icon } from "@iconify/vue";
import { useInclomingCallStore } from "../../model/incomingCallStore";
import { onMounted, onUnmounted } from "vue";
import { useSocket } from "@/shared/config/useSocketStore";
import { findMessagedUserById } from "@/shared/lib/helpers";
import { ref } from "vue";

const servers = {
    iceServers: [
        {
            urls: "stun:stun.l.google.com:19302",
        },
    ],
};

const { socket } = useSocket();
const incomingCallStore = useInclomingCallStore();

let pc = ref<RTCPeerConnection | null>(null);

const props = defineProps<{
    localVideo: HTMLVideoElement | null;
    remoteVideo: HTMLVideoElement | null;
}>();

const localStream = ref<MediaStream | null>(null);
const remoteStream = ref<MediaStream | null>(null);
const pendingCandidates = ref<RTCIceCandidateInit[]>([]);

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
    localStream.value = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    if (!props.localVideo) return;
    props.localVideo.srcObject = localStream.value;

    pc.value = new RTCPeerConnection(servers);

    pc.value.onicecandidate = (event) => {
        if (event.candidate) {
            socket.emit("candidate", { candidate: event.candidate });
        }
    };

    pc.value.ontrack = (event) => {
        if (props.remoteVideo) {
            remoteStream.value = event.streams[0];
            props.remoteVideo.srcObject = remoteStream.value;
        }
    };

    if (localStream.value) {
        localStream.value
            .getTracks()
            .forEach((t) => pc.value?.addTrack(t, localStream.value!));
    }

    await pc.value.setRemoteDescription(new RTCSessionDescription(offer));

    const answer = await pc.value.createAnswer();
    await pc.value.setLocalDescription(answer);

    socket.emit("answer", { answer });

    for (const c of pendingCandidates.value) {
        await pc.value.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.value.length = 0;

    incomingCallStore.accept();
};

onMounted(() => {
    socket.on("get:incoming-call", getIncomingCall);
    socket.on("call:end", callCanceled);

    socket.on("webrtc:offer", ({ offer }) => {
        handleOffer(offer);
    });
});

onUnmounted(() => {
    socket.off("get:incoming-call", getIncomingCall);
    socket.off("call:end", callCanceled);
    socket.off("webrtc:offer", ({ offer }) => {
        handleOffer(offer);
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
